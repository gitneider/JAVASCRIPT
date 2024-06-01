const express = require('express');
const router = express.Router();
const propietarioController = require('../controllers/propietarioController');

// Ruta para mostrar todos los propietarios
router.get('/', propietarioController.getAllPropietarios);

// Ruta para mostrar el formulario de registro de propietarios
router.get('/registrar', propietarioController.showRegistrarForm);

// Ruta para procesar el registro de un nuevo propietario
router.post('/registrar', propietarioController.registrarPropietario);

// Ruta para mostrar el formulario de edición de un propietario
router.get('/editar/:id', propietarioController.showEditarForm);

// Ruta para procesar la edición de un propietario
router.post('/editar/:id', propietarioController.editarPropietario);

// Ruta para eliminar un propietario
router.get('/eliminar/:id', propietarioController.eliminarPropietario);

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', propietarioController.showLoginForm);

// Ruta para procesar el inicio de sesión
router.post('/login', propietarioController.login);

// Ruta para cerrar sesión
router.post('/logout', propietarioController.logout);

module.exports = router;
