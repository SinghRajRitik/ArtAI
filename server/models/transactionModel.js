import mongoose from 'mongoose'

const transcationSchema = mongoose.Schema({
    userId : {type : String , reqired: true },
    plan : {type : String , required : true},
    amount : {type : Number , required : true},
    credits : {type : Number , reqired : true},
    payment : {type : Boolean , default : false},
    date : {type : Date }

})

const transcationModel = mongoose.model("transaction",transcationSchema);

export default transcationModel;
