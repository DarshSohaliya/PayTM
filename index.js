import  express  from "express";
import userRouter from './router/index'
import cors from 'cors'
const app= express()


app.use(cors())
app.use(express.json())

app.use('/api/v1',userRouter)

app.listen(3000)



