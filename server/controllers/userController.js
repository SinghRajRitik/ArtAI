import dotenv from "dotenv";
dotenv.config();  
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import transcationModel from "../models/transactionModel.js";
import Razorpay from "razorpay";

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
        
        const userId = req.userId;

        const user = await userModel.findById(userId)

        res.json({success : true , credits:user.creditBalance , user :{name : user.name}})

    } catch (error) {
        console.log(error)
        res.json({success : true , message : error.message})
    }
}
const razorpayInstance = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})


const paymentRazorpay = async(req,res)=>{
    try{
        const userId = req.userId;
       const {planId} = req.body
         
       console.log(userId)
       const userData = await userModel.findById(userId)


       if (!userData || !planId){
        return res.json({success : false , message :"Missing Details"})
       }

       let credits, plan , amount , date;

       switch (planId) {
        case 'Basic':
            plan = 'Basic'
            credits = 15
            amount = 10
            break;
        case 'Advance':
            plan = 'Advance'
            credits = 70
            amount = 30
            break;
        case 'Premier':
            plan = 'Premier'
            credits = 150
            amount = 50
            break;
       
        default:
            return res.json({success : false , message :'plan not found'});
       }

       date = Date.now()

       const transactionData = {
        userId, plan, amount , credits, date
       }
       const newTransaction = await transcationModel.create(transactionData)

       const options = {
        amount : amount  * 100,
        currency : process.env.CURRENCY,
        receipt : newTransaction._id,

       }

       const order = await razorpayInstance.orders.create(options);

       console.log(order)

       res.json({success:true , order})


    }catch(error){
           console.log({success:true, message : error.message})
    }
}

const verifyRazorpay = async(req,res)=>{
    try {
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid'){
            const transactionData = await transcationModel.findById(orderInfo.receipt)
            if(transactionData.payment){
                return res.json({
                    success : false,
                    message : 'payment failed'})    
            }

        const userData  = await userModel.findById(transactionData.userId)

        const creditBalance = userData.creditBalance + transactionData.credits

        await userModel.findByIdAndUpdate(userData._id, {creditBalance})

        await transcationModel.findByIdAndUpdate(transactionData._id, {payment:true})

        res.json({success : true, message : "Credit Added"})

        }else{
            res.json({
            success : false,
            message :"payment failed"})
        
        }

    } catch (error) {
        console.log(error)
        res.json({success:false , message :error.message})
    }
   
}



export {registerUser  , loginUser , userCredit, verifyRazorpay , paymentRazorpay};