import mongoose from "mongoose"
import dns from "node:dns";

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URL)
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        const conn = await mongoose.connect(process.env.MONGODB_URL)
          
          console.log('MongoDB Connected')
      
        
    } catch (error) {
        console.error("MongoDB connection error:" , error)
        process.exit(1)
    }
          
};

export default connectDB;