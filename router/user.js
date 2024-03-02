import  express  from "express"
import zod from 'zod'
import User from '../db'
import JWT_SECRET from "../config"
import jwt from 'jsonwebtoken'
import authMiddleware from "../middleware"
const router = express.Router()


const signupSchema = zod.object({
    username : zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    


})

router.post('/signup' , async (req,res) => {
    const body = req.body
    const {success} = signupSchema.safeParse(req.body)
    if (!success) {
        return res.json({
            message:"Email already taken / Incorrect inputs"
        })
    }
    const existingUser = User.findOne({
         username:body.username
    })
    if (existingUser) {
        return res.json({
            message:"Email already taken / Incorrect inputs"
        })
    }


    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

 const token = jwt.sign({
    userId
 },JWT_SECRET)
 res.json({
    message:'User created successfully',
    token:token
 })

} )

const signin = zpd.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post('/sigin',async (req,res) => {
    const {success} =signin.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    } 

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)

        res.json({
            token:token
        })
        return
            
    }

    res.status(411).json({
        message:"Error while logging in"
    })
   
  
        
})

const update = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

router.put('/' ,authMiddleware ,async(req,res) => {
    const { success } = update.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne(req.body,{
        id:req.userId
    })

    res.json({
        message:"Updated successfully"
    })
})


router.get('/bulk' , async (req,res) => {
      
    const filter = req.query.filter || ""

    const users = await User.find({
        $or :[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })


    res.json({
        user: users.map(user => ({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})






export default router
