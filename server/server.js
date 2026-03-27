import express from 'express'
import cors from 'cors'
import  dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

dotenv.config()
const port = process.env.PORT || 4000
const app = express()


app.use(cors())
app.use(express.json())


app.use('/api/user', userRouter)

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
