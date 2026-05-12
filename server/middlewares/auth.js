import jwt from 'jsonwebtoken'

const authUser = async (req, res,next) => {
    const token = req.headers.token;
    if (!token) {
        return res.json({
            success: false,
            message: 'Not Authorized Login Again'
        })
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)


        if (token_decode) {
            req.userId = token_decode.id;

            return next()

        } else {
            return res.json({ success: false, message: "Not authorized Login Again$" })
        }

    } catch (error) {
        console.log("error:", error)
        return res.json({ success: false, message: "Not authorized Login Again" })
    }
}

export default authUser;