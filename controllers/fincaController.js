const fincaModel = require("../models/fincaModel");

// Obtener todas las fincas
const getAllFincas = async (req, res) => {
  try {
    const fincas = await fincaModel.getAllFincas();
    res.render('../views/finca/listar', { fincas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las fincas");
  }
};

// Obtener una finca por su id
const getFincaById = async (req, res) => {
  const id = req.params.id;
  try {
    const finca = await fincaModel.getFincaById(id);
    if (finca) {
      res.render("views/finca/editar", { finca });
    } else {
      res.status(404).send("Finca no encontrada");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la finca");
  }
};

// Mostrar formulario de agregar fincas
const showAgregarForm = (req, res) => {
  res.render("../views/finca/agregar");
};

// Agregar una nueva finca
const agregarFinca = async (req, res) => {
  const finca = req.body;
  try {
    const result = await fincaModel.addFinca(finca);
    // Redirigir a la página de listar fincas después de agregar la finca
    res.redirect("/finca/listar");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar la finca");
  }
};

// Mostrar formulario de edición de fincas
const showEditarForm = async (req, res) => {
  const id = req.params.id;
  try {
    const finca = await fincaModel.getFincaById(id);
    if (finca) {
      res.render("../views/finca/editar", { finca });
    } else {
      res.status(404).send("Finca no encontrada");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la finca");
  }
};

// Editar una finca
const editarFinca = async (req, res) => {
  const id = req.params.id;
  const finca = req.body;
  try {
    await fincaModel.editFinca(id, finca);
    res.redirect("/finca/listar");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar la finca");
  }
};

// Eliminar una finca
const eliminarFinca = async (req, res) => {
  const id = req.params.id;
  try {
    await fincaModel.deleteFinca(id);
    res.redirect("/finca/listar");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar la finca");
  }
};

module.exports = {
  getAllFincas,
  getFincaById,
  showAgregarForm,
  agregarFinca,
  showEditarForm,
  editarFinca,
  eliminarFinca,
};
