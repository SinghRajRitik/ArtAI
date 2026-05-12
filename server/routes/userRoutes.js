import express from "express";
import { loginUser, paymentRazorpay, registerUser, userCredit, verifyRazorpay } from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', authUser ,userCredit)
userRouter.post('/pay-razor',authUser , paymentRazorpay)
userRouter.post('/verify-razor', verifyRazorpay)

export default userRouter;