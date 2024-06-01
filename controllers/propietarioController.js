const propietarioModel = require('../models/propietarioModel');

// Obtener todos los propietarios
const getAllPropietarios = async (req, res) => {
  try {
    const propietarios = await propietarioModel.getAllPropietarios();
    res.render('../views/propietario/listar', { propietarios });
  } catch (error) {
    console.error('Error al obtener los propietarios:', error.message);
    res.status(500).send('Error al obtener los propietarios: ' + error.message);
  }
};

// Obtener un propietario por su id
const getPropietarioById = async (req, res) => {
  const id = req.params.id;
  try {
    const propietario = await propietarioModel.getPropietarioById(id);
    if (propietario) {
      res.render('views/propietario/editar', { propietario });
    } else {
      res.status(404).send('Propietario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el propietario por ID:', error.message);
    res.status(500).send('Error al obtener el propietario por ID: ' + error.message);
  }
};

// Mostrar formulario de registro de propietarios
const showRegistrarForm = (req, res) => {
  res.render('../views/propietario/registrar');
};

// Registrar un nuevo propietario
const registrarPropietario = async (req, res) => {
  const propietario = req.body;
  try {
    const propietarioId = await propietarioModel.registrarPropietario(propietario);
    console.log(propietarioId);
    res.redirect('/propietario');
  } catch (error) {
    console.error('Error al agregar el propietario:', error.message);
    res.status(500).send('Error al agregar el propietario: ' + error.message);
  }
};

// Mostrar formulario de edición de propietarios
const showEditarForm = async (req, res) => {
  const id = req.params.id;
  try {
    const propietario = await propietarioModel.getPropietarioById(id);
    if (propietario) {
      res.render('../views/propietario/editar', { propietario });
    } else {
      res.status(404).send('Propietario no encontrado');
    }
  } catch (error) {
    console.error('Error al mostrar el formulario de edición:', error.message);
    res.status(500).send('Error al mostrar el formulario de edición: ' + error.message);
  }
};

// Editar un propietario
const editarPropietario = async (req, res) => {
  const id = req.params.id;
  const propietario = req.body;
  try {
    await propietarioModel.editarPropietario(id, propietario);
    res.redirect('/propietario');
  } catch (error) {
    console.error('Error al editar el propietario:', error.message);
    res.status(500).send('Error al editar el propietario: ' + error.message);
  }
};

// Eliminar un propietario
const eliminarPropietario = async (req, res) => {
  const id = req.params.id;
  try {
    await propietarioModel.deletePropietario(id);
    res.redirect('/propietario');
  } catch (error) {
    console.error('Error al eliminar el propietario:', error.message);
    res.status(500).send('Error al eliminar el propietario: ' + error.message);
  }
};

// Mostrar formulario de inicio de sesión
const showLoginForm = (req, res) => {
  res.render('../views/propietario/login');
};

// Procesar inicio de sesión
const login = async (req, res) => {
  const { email, clave } = req.body;
  try {
    const propietario = await propietarioModel.getPropietarioByEmail(email);
    if (propietario && propietario.clave === clave) {
      req.session.propietario = propietario; // Guardar el propietario en la sesión
      res.redirect('/propietario/login');
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).send('Error al iniciar sesión: ' + error.message);
  }
};

// Cerrar sesión
const logout = (req, res) => {
  req.session.propietario = null; // Eliminar el propietario de la sesión
  res.redirect('/');
};

module.exports = {
  getAllPropietarios,
  getPropietarioById,
  showRegistrarForm,
  registrarPropietario,
  showEditarForm,
  editarPropietario,
  eliminarPropietario,
  showLoginForm,
  login,
  logout
};
