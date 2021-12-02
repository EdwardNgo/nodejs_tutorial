const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tutorial = new Schema({
    title: String,
    description: String,
    published: Boolean,
})

//mongo auto doi thanh so nhieu -> collection la Tutorials
module.exports = mongoose.model('Tutorial',Tutorial)