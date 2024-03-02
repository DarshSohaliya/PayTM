import  express  from "express";
import userRouter from './router/user'
import bankRouter from './router/account'
import cors from 'cors'
const app= express()


app.use(cors())
app.use(express.json())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/bank',bankRouter)



app.listen(3000)



