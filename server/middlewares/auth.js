import jwt from 'jsonwebtoken'

const authUser = async (req, res,next) => {
    const token = req.headers.token;
    if (!token) {
        res.json({
            seccess: false,
            message: 'Not Authorized Login Again'
        })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if (token_decode) {
            req.body.userId = token_decode.id;

        } else {
            res.json({ success: false, message: "Not authorized Login Again" })

        }
        next()

    } catch (error) {
        console.log("error:", error)
        res.json({ success: false, message: "Not authorized Login Again" })
    }
}

export default authUser;