const jwt = require('jsonwebtoken')

//Authorization:Bearer <token>

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] //neu co auth thi la cai dang sau kia
    console.log(token)
    if(!token) {
        return  res.status(401).json({success: false,message:'Token not found'})
    }
    
    //All good
    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId //Add userId to req header
        next()

    } catch(error){
        console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = verifyToken
