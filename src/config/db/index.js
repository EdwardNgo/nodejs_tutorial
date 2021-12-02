const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost/nodejs_lab',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("SUCCESS")
    } catch(e){
        console.log("FAIL")
    }
}

module.exports = {connect} //{connect:connect}