const jwt = require('jsonwebtoken')

const authenticate = (req, res, next)=>{

    try{
        const token= req.header.authorization.split(' ')[1]
        const decode= jwt.verify(token, 'secretvalue')
req.user= decode
next()
    }catch(error){
        res.json({
            message: 'authentication failed'
        })
    }
}

module.exports= authenticate