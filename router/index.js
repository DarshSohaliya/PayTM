import  express  from "express"
import zod from 'zod'
import User from '../db'
import JWT_SECRET from "../config"
import jwt from 'jsonwebtoken'
const router = express.Router()


const signupSchema = zod.body({
    username : zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    


})

router.post('/user/signup' , async (req,res) => {
    const body = req.body
    const {success} = signupSchema.safeParse(req.body)
    if (!success) {
        return res.json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const user = User.findOne({
         username:body.username
    })
    if (user._id) {
        return res.json({
            message:"Email already taken / Incorrect inputs"
        })
    }

 const dbUser = await User.create(body)

 const token = jwt.sign({
    userId: dbUser._id
 },JWT_SECRET)
 res.json({
    message:'User created successfully',
    token:token
 })

} )


export default router
