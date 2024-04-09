const mongoose = require("mongoose");

const datosSchema2 = mongoose.Schema({
    temperatura:{
        type: String,
        required: true  
    },
    humedad:{
        type:String,
        required: true
    },
    movimiento:{
        type: String,
        required: true  
    },
    fechaHora:{
        type:String,
        required: true
    },
    aula:{
        type:String,
        required: true
    },
});

module.exports = mongoose.model('datosSensor2', datosSchema2);    