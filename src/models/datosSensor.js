const mongoose = require("mongoose");

const datosSchema = mongoose.Schema({
    sensor:{
        type: String,
        required: true  
    },
    status:{
        type:String,
        required: true
    },
});

module.exports = mongoose.model('datosSensor', datosSchema);    