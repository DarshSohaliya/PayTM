import mongoose from "mongoose";


    mongoose.connect('mongodb+srv://paytm:pay@123@cluster0.iae5kck.mongodb.net/paytm')

    const userSchema = mongoose.Schema({
        username:String,
        password:String,
        firstName:String,
        lastName:String,

    })

    export default mongoose.model("User" ,userSchema)