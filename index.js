
const mongoose = require('mongoose');
const express = require('express');
const userModel = require('./userModel');
const app = express();
const PORT = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'mydb';
const collectionName = 'users';
/*mongodb://localhost:27020/mydb*/
/*mongodb://mongo:27020/mydb*/
mongoose.connect('mongodb://mongo:27020/mydb')
.then(db => {console.log("conexion exitosa", db.connection.host)})
.catch(err => {console.log(err)})

// Obtener todos los documentos en la colección
app.get("/", async(req, res) => {
    res.json("hola");
})

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios.' });
    }
});
//insertar un usuario
app.post('/user', async (req, res) => {
    try {
        const newUser = req.body; // Datos del usuario desde el cuerpo de la solicitud
        const user = await userModel.create(newUser);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar el usuario.' });
    }
});

// Obtener un documento por ID
app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findOne({ _id: id });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener datos.' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.json({ message: 'Usuario eliminado exitosamente.', deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario.' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
