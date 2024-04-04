const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true  
    },
    app:{
        type:String,
        required: true
    },
    apm:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required:true
    },
});

module.exports = mongoose.model('User', userSchema);    