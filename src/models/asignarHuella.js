const mongoose = require('mongoose');
const Huellamodel = new mongoose.Schema({
    id:{
        type: Number,
        require: true
    },
},
{
    timestamps:true,
}

);
const Modelhuella = mongoose.model('huella',Huellamodel);
module.exports = Modelhuella;