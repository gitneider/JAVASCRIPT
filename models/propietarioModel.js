const db = require('../config/database');

// Obtener todos los propietarios
const getAllPropietarios = async () => {
  try {
    const result = await db.query('SELECT * FROM propietarios');
    return result;
  } catch (error) {
    console.error('Error al obtener todos los propietarios:', error);
    throw new Error('Error al obtener todos los propietarios');
  }
};

// Obtener un propietario por su ID
const getPropietarioById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM propietarios WHERE id = ?', [id]);
    return result[0];
  } catch (error) {
    console.error(`Error al obtener el propietario con ID ${id}:`, error);
    throw new Error(`Error al obtener el propietario con ID ${id}`);
  }
};

// Obtener un propietario por su email
const getPropietarioByEmail = async (email) => {
  try {
    const result = await db.query('SELECT * FROM propietarios WHERE email = ?', [email]);
    return result[0];
  } catch (error) {
    console.error(`Error al obtener el propietario con email ${email}:`, error);
    throw new Error(`Error al obtener el propietario con email ${email}`);
  }
};

// Registrar un nuevo propietario
const registrarPropietario = async (propietario) => {
  const { clave, nombre, apellido, fechaNacimiento, email, genero, telefono } = propietario;
  try {
    const result = await db.query(
      'INSERT INTO propietarios (clave, nombre, apellido, fechaNacimiento, email, genero, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [clave, nombre, apellido, fechaNacimiento, email, genero, telefono]
    );
    return result;
  } catch (error) {
    console.error('Error al registrar un propietario:', error);
    throw new Error('Error al registrar un propietario');
  }
};

// Editar un propietario existente
const editarPropietario = async (id, propietario) => {
  const { clave, nombre, apellido, fechaNacimiento, email, genero, telefono } = propietario;
  try {
    await db.query(
      'UPDATE propietarios SET clave = ?, nombre = ?, apellido = ?, fechaNacimiento = ?, email = ?, genero = ?, telefono = ? WHERE Id = ?',
      [clave, nombre, apellido, fechaNacimiento, email, genero, telefono, id]
    );
  } catch (error) {
    console.error(`Error al editar el propietario con ID ${id}:`, error);
    throw new Error(`Error al editar el propietario con ID ${id}`);
  }
};

// Eliminar un propietario
const deletePropietario = async (id) => {
  try {
    await db.query('DELETE FROM propietarios WHERE Id = ?', [id]);
  } catch (error) {
    console.error(`Error al eliminar el propietario con ID ${id}:`, error);
    throw new Error(`Error al eliminar el propietario con ID ${id}`);
  }
};

module.exports = {
  getAllPropietarios,
  getPropietarioById,
  getPropietarioByEmail, // Añadido aquí
  registrarPropietario,
  editarPropietario,
  deletePropietario
};
