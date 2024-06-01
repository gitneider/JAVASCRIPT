const express = require('express');
const router = express.Router();
const fincaController = require('../controllers/fincaController');

// Obtener todas las fincas
router.get('/listar', fincaController.getAllFincas);

// Obtener una finca por su id
router.get('/listar/:id', fincaController.getFincaById);

// Mostrar formulario de agregar fincas
router.get('/agregar', fincaController.showAgregarForm);

// Agregar una nueva finca
router.post('/agregar', fincaController.agregarFinca);

// Mostrar formulario de edición de fincas
router.get('/editar/:id', fincaController.showEditarForm);

// Editar una finca
router.post('/editar/:id', fincaController.editarFinca);

// Eliminar una finca
router.get('/eliminar/:id', fincaController.eliminarFinca);

module.exports = router;
