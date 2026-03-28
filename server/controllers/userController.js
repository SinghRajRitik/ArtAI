import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                success: false, message: "Missing Details"
            })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "please enter a strong Password" })
        }

        const hashedPassword = await bcrypt.hash(password, 5)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, user: { name: user.name } })


    } catch (error) {

        console.log("error:", error)
        res.json({
            success: false,
            message: "server error"
        })
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log("error:", error)
        res.json({
            success: false,
            message: "server error"
        })

    }
}

const userCredit = async(req,res)=>{
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId)

        res.json({success : true , credits:user.creditBalance , user :{name : user.name}})

    } catch (error) {
        console.log(error)
        res.json({success : true , message : error.message})
    }
}

export {registerUser  , loginUser , userCredit };