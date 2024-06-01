const db = require("../config/database"); // Suponiendo que tienes un módulo de base de datos configurado

// Obtener todas las fincas
const getAllFincas = async () => {
  try {
    const result = await db.query("SELECT * FROM fincas");
    return result;
  } catch (error) {
    console.error("Error al obtener todas las fincas:", error);
    throw new Error("Error al obtener todas las fincas");
  }
};

// Obtener una finca por su ID
const getFincaById = async (id) => {
  try {
    const result = await db.query(`SELECT * FROM fincas WHERE id = ${id}`);
    return result;
  } catch (error) {
    console.error(`Error al obtener la finca con ID ${id}:`, error);
    throw new Error(`Error al obtener la finca con ID ${id}`);
  }
};

// Agregar una nueva finca
const addFinca = async (finca) => {
  const {
    Id,
    nombre,
    numHectareas,
    metrosCuadrados,
    propietario,
    capataz,
    pais,
    departamento,
    ciudad,
    siProduceLeche,
    siProduceCereales,
    siProduceFrutas,
    siProduceVerduras,
    propietarioId,
  } = finca;
  try {
    const result = await db.query(
      `INSERT INTO fincas (
        nombre, numhectareas, metroscuadrados, propietario, capataz, pais,
        departamento, ciudad, si_Produce_Leche, si_Produce_Cereales,
        si_Produce_Frutas, si_Produce_Verduras, Propietario_id
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`,
      [
        nombre,
        numHectareas,
        metrosCuadrados,
        propietario,
        capataz,
        pais,
        departamento,
        ciudad,
        siProduceLeche,
        siProduceCereales,
        siProduceFrutas,
        siProduceVerduras,
        propietarioId,
      ]
    );
    console.log(result)
    return result;
  } catch (error) {
    console.error("Error al agregar una finca:", error);
    throw new Error("Error al agregar una finca");
  }
};

// Editar una finca existente
const editFinca = async (id, finca) => {
  const {
    nombre,
    numHectareas,
    metrosCuadrados,
    propietario,
    capataz,
    pais,
    departamento,
    ciudad,
    siProduceLeche,
    siProduceCereales,
    siProduceFrutas,
    siProduceVerduras,
    propietarioId,
  } = finca;
  try {
    await db.query(
      `UPDATE fincas SET
        nombre = ?, numhectareas = ?, metroscuadrados = ?, propietario = ?,
        capataz = ?, pais = ?, departamento = ?, ciudad = ?, si_produce_leche = ?,
        si_produce_cereales = ?, si_produce_frutas = ?, si_produce_verduras = ?,
        propietario_id = ?
      WHERE id = ?`,
      [
        nombre,
        numHectareas,
        metrosCuadrados,
        propietario,
        capataz,
        pais,
        departamento,
        ciudad,
        siProduceLeche,
        siProduceCereales,
        siProduceFrutas,
        siProduceVerduras,
        propietarioId,
        id,
      ]
    );
  } catch (error) {
    console.error(`Error al editar la finca con ID ${id}:`, error);
    throw new Error(`Error al editar la finca con ID ${id}`);
  }
};

// Eliminar una finca
const deleteFinca = async (id) => {
  try {
    await db.query("DELETE FROM fincas WHERE id = ?", [id]);
  } catch (error) {
    console.error(`Error al eliminar la finca con ID ${id}:`, error);
    throw new Error(`Error al eliminar la finca con ID ${id}`);
  }
};

module.exports = {
  getAllFincas,
  getFincaById,
  addFinca,
  editFinca,
  deleteFinca,
};
