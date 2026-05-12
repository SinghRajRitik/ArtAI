import  dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const port = process.env.PORT || 4000
const app = express()


app.use(cors(
    {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
))
app.use(express.json())


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

const startServer = async () => {
    try {
        await connectDB()

        app.listen(port, () => {
            console.log('Server is running on port ' + port)
        })
    } catch (error) {
        console.error('Error starting server:', error)
    }
}

startServer()

app.get('/', (req, res) => {
    res.send({
        message: "api working"
    })
})
