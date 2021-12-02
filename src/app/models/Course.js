const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    name:{type:String,maxLength:255},
    level:{type:String,maxLength:255},
    image:{type:String,maxLength:255},
})

//mongo auto doi thanh so nhieu -> collection la Courses
module.exports = mongoose.model('Course',Course)