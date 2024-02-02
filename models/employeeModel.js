const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema= new Schema({
name:{
    type: String
},
designation:{
    type: String
},
email:{
    type: String
},
phone:{
    type:String
},
number:{
    type: Number
}


},{timestamps:true})

const employee = mongoose.model('Employee ', employeeSchema)
module.exports= employee