const User = require('../models/User')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthController {

    async signup(req,res){
        const {username,password} = req.body

        if (!username || !password)
            return res.status(400)
                      .json({succes:false,message:'Missing username or password'})

        try{
            //Check for existed user
            const user = await User.findOne({username})
            if(user)
                return res.status(400)
                          .json({success:false,message:'User already exists'})
            
            //All good
            const hashedPassword = md5(password)
            const newUser = new User({ username, password: hashedPassword })
            await newUser.save()

            // Return token
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({
                success: true,
                message: 'User created successfully',
                accessToken
            })

        } catch(error){

            console.log(error)
            res.status(500)
               .json({ success: false, message: 'Internal server error' })

        }
    }

    async login(req, res){
     
        const {username,password} = req.body

        if (!username || !password)
            return res.status(400)
                      .json({succes:false,message:'Missing username or password'})
        try {
            const user = await User.findOne({username: username})
            if(!user)
                res.status(400)
                   .json({success:false,message:'Incorrect username or password'})

            const hashedPassword = md5(password)
            if (hashedPassword !== user.password)
                res.status(400)
                   .json({success:false,message:'Incorrect username or password'})
             
            //All good
            const accessToken = jwt.sign(
                {userId:user._id},
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({
                success: true,
                message: 'User logged in successfully',
                accessToken
            })

        } catch(error){
            console.log(error)
            res.status(500)
               .json({ success: false, message: 'Internal server error' })
        }
    }

}

module.exports = new AuthController()
