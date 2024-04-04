const express = require("express");
const usuariosSchema = require("../models/usuarios");
const router = express.Router();
const bcrypt = require('bcrypt');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const axios = require('axios');


//create User
// POST /usuarios
router.post("/usuarios", async (req, res) => {
    const { name, app, apm, date, email, password } = req.body;
    
    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario con la contraseña hasheada
        const user = new usuariosSchema({
            name,
            app,
            apm,
            date,
            email,
            password: hashedPassword , // Asignar la contraseña hasheada al usuario
            role: 'estudiante',
        });

        // Guardar el usuario en la base de datos
        const savedUser = await user.save();

        res.status(201).json(savedUser); // Devolver el usuario guardado en la respuesta
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error en el servidor' 
        });
    }
});

router.post("/usuarios/profesores", async (req, res) => {
    const { name, app, apm, date, email, password } = req.body;
    
    try {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario con la contraseña hasheada
        const user = new usuariosSchema({
            name,
            app,
            apm,
            date,
            email,
            password: hashedPassword , // Asignar la contraseña hasheada al usuario
            role: 'Profesor',
        });

        // Guardar el usuario en la base de datos
        const savedUser = await user.save();

        res.status(201).json(savedUser); // Devolver el usuario guardado en la respuesta
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error en el servidor' 
        });
    }
});

router.get("/usuarios/token", async (req, res) => {
    try {
        // Obtener el token de autorización del encabezado de la solicitud
        const token = req.headers.authorization;

        // Verificar si se proporcionó un token
        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
        }

        // Extraer el token del encabezado (formato: Bearer <token>)
        const tokenParts = token.split(' ');
        const tokenValue = tokenParts[1];

        // Verificar si el token es válido y obtener los datos del usuario
        jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token de autorización inválido' });
            } else {
                // El token es válido, obtener el ID del usuario del token
                const userId = decoded.id;

                // Buscar al usuario por su ID en la base de datos
                usuariosSchema.findById(userId)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({ message: 'Usuario no encontrado' });
                        } else {
                            // Devolver los datos del usuario en la respuesta
                            return res.status(200).json(user);
                        }
                    })
                    .catch(err => {
                        console.error('Error al buscar usuario:', err);
                        return res.status(500).json({ message: 'Error en el servidor' });
                    });
            }
        });
    } catch (error) {
        console.error('Error al obtener información del usuario:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});
/* 
router.post("/usuarios", (req,res) => {
    const user = usuariosSchema(req.body);
    user
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json ({ message: error }));
}); */
// POST /usuarios/login

// Obtener información del usuario actual basada en el token de autenticación
/* router.get("/usuarios/token", async (req, res) => {
    // Obtener el token de autorización del encabezado de la solicitud
    const token = req.headers.authorization;
    
    try {
        // Realizar una solicitud a la API externa para validar el token y obtener la información del usuario
        const response = await axios.get('http://127.0.0.1:9000/usuarios/token', {
            headers: {
                'Authorization': token
            }
        });

        // Verificar si la solicitud fue exitosa
        if (response.status === 200) {
            const userData = response.data;
            return res.status(200).json(userData); // Devolver la información del usuario
        } else {
            return res.status(500).json({ 
                success: false,
                message: 'Error al obtener la información del usuario' 
            });
        }
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error en el servidor' 
        });
    }
});
 */

//---------------------------------------------------------------------


router.post("/usuarios/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Buscar al usuario por su correo electrónico en la base de datos
        const user = await usuariosSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);   

        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Credenciales inválidas' 
            });
        }

        // Crear y firmar el token de autenticación
        const payload = {
            id: user._id,
            email: user.email
        };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                return res.status(500).json({ 
                    success: false,
                    message: 'Error al generar el token de autenticación' 
                });
            }

            return res.status(200).json({ 
                success: true,
                token: 'Bearer ' + token, 
                id: user._id,
                name: user.name,
                app: user.app,
                apm:user.apm,
                date:user.date,
                email:user.email,
                role:user.role,
            });
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error en el servidor' 
        });
    }
});


//Get all users 
router.get("/usuarios",(req, res )=>{
    usuariosSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});




//Get a user   
router.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    usuariosSchema
        .findById( id )
        .then ((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Get a user for email   
router.get("/usuarios/:email/:password", (req, res) => {
    const { email, password } = req.params;
    usuariosSchema
        .findOne({ email, password })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
// update a user 
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { name, app, apm, date, email, password } = req.body;
    usuariosSchema
        .updateOne({ _id : id}, {$set : { name, app, apm, date, email, password} })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//delete a user
router.delete("/usuarios/:id", (req, res) =>{
    const { id } = req.params;
    usuariosSchema
        .deleteOne({ _id : id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router; 