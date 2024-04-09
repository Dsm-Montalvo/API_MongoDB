const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const apartadoRoutes = require("./routes/apartadoEspacio");
const aulaRoutes = require("./routes/aula");
const sensorRoutes = require("./routes/datosSensor");
const sensor2Routes = require("./routes/datosSensor2");
const sensor3Routes = require("./routes/datosSensor3");
const usuariosRoutes = require("./routes/usuarios");
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', sensorRoutes);
app.use('/api', sensor2Routes);
app.use('/api', sensor3Routes);
app.use('/api', apartadoRoutes);
app.use('/api', aulaRoutes);
app.use('/api', usuariosRoutes);
//routes
app.get("/", (req,res) => {
    res.send("Welcome to my api");
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

app.listen(port,() => console.log("server listening on port", port)); 

