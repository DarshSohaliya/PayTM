import JWT_SECRET from "./config";
import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startWith('Bearer')) {
        return res.statu(403).json({})
    }
   
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token,JWT_SECRET)

      if (decoded.userId) {
        req.userId = decoded.userId
        next()
      }
      else{
        return res.status(403).json({})
      }

    } catch (error) {
        return res.status(403).json({})

    }
}

export default authMiddleware