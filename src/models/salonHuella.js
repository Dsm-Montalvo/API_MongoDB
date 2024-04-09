const mongoose = require('mongoose');
const salones = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    app: {
        type: String,
        required: true
    },
    apm: {
        type: String,
        required: true
    },
    hora:{
        type: String,
        required: true
    },
    mensaje:{
        type: String,
        required: true
    }
},
{
    timestamps:true,
}
);

const Modelosalones = mongoose.model( 'Datosalon', salones);
module.exports = Modelosalones;