import userModel from "../models/userModel.js";
import FormData from "form-data"
import axios from 'axios'


const generateImage = async (req, res) => {
    try {
         const { prompt } = req.body;
         const userId = req.userId;

        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        if (!prompt) {
            return res.json({ success: false, message: 'missing Details' })
        }
        if (user.creditBalance == 0 || user.creditBalance < 0) {
            return res.json({ success: false, message: 'No credit Balance', creditBalance: user.creditBalance })
        }
        const formData = new FormData()
        formData.append('prompt', prompt)

        const response = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIP_DROP_API,
                },
                responseType: 'arraybuffer'
            }
        )

       const base64Image = Buffer.from(response.data, 'binary').toString('base64');
       
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

        res.json({ success: true, message: "Image Generated Succesfully", creditBalance: user.creditBalance - 1, resultImage })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default generateImage;