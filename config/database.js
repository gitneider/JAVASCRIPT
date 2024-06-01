const mysql = require("mysql");

// Configuración de la conexión a la base de datos MySQL usando variables de entorno
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "javabd",
  connectionLimit: 10, // Pool de conexiones
};

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool(dbConfig);

// Método para ejecutar consultas
const query = async (queryText, queryParams) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error al obtener la conexión a la base de datos: ", err);
        reject(err);
      }
      
      connection.query(queryText, queryParams, (error, results) => {
        if (error) {
          console.error("Error en la consulta a la base de datos: ", error);
          reject(error);
        } else {
          resolve(results);
        }
        connection.release();
      });
    });
  });
};

// Función para registrar un nuevo propietario en la base de datos
const registrarPropietario = (propietario, callback) => {
  const queryText =
    "INSERT INTO propietarios (Id, clave, nombre, apellido, fechaNacimiento, email, genero, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const queryParams = [
    propietario.Id,
    propietario.clave,
    propietario.nombre,
    propietario.apellido,
    propietario.fechaNacimiento,
    propietario.email,
    propietario.genero,
    propietario.telefono,
  ];

  query(queryText, queryParams, callback);
};

// Función para agregar una nueva finca en la base de datos
const agregarFinca = (finca, callback) => {
  const queryText =
    "INSERT INTO fincas (nombre, numHectareas, metrosCuadrados, propietario, capataz, pais, departamento, ciudad, si_produce_leche, si_produce_cereales, si_produce_frutas, si_produce_verduras, propietario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const queryParams = [
    finca.nombre,
    finca.numHectareas,
    finca.metrosCuadrados,
    finca.propietario,
    finca.capataz,
    finca.pais,
    finca.departamento,
    finca.ciudad,
    finca.si_produce_leche,
    finca.si_produce_cereales,
    finca.si_produce_frutas,
    finca.si_produce_verduras,
    finca.propietario_id,
  ];

  query(queryText, queryParams, callback);
};

// Prueba de conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos MySQL");
  connection.release(); // Liberar la conexión después de usarla
});

module.exports = {
  query,
  registrarPropietario, // Exportar la función registrarPropietario
  agregarFinca, // Exportar la función agregarFinca
};
