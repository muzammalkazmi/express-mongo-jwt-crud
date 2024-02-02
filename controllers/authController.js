const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const register= (req, res, next)=>{
    bcrypt.hash(req.body.passward, 10, function(err, hashedpsw){
        if(err){
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            passward: hashedpsw
        })
        user.save()
        .then(()=>{
            res.json({
                message:'User has been created'
            })
        })
        .catch(()=>{
            res.json({
                message: 'An error occured while creating user'
            })
        })

    })

    
}

const logIn =(req, res, next)=>{

    let username= req.body.username
    let passward= req.body.passward
    User.findOne({$or:[{email:username},{phone:username}]})
    .then(user=>{
        if(user){
bcrypt.compare(passward, user.passward, function(err, result){
    if(err){
        res.json({
            message: 'Incorrect passward'
        })
    }
    if(result){
        let token= jwt.sign({name:user.name}, 'secretvalue', {expiresIn:'30s'})
        
        res.status(200).json({
            message:' Login successfull',
            token,
            
        })
    }else{
        res.json({
            message:'unable to login: please try again'
        })
    }
})
        }else{
            res.json({
                message: 'user not found'
            })
        }
    })
}

module.exports={
    register, logIn
}