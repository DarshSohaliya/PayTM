import  express  from "express";
import userRouter from './router/index'
const app= express()

app.use('/api/v1',userRouter)



