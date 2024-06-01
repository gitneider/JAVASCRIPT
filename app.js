const express = require('express');
const session = require('express-session');
const path = require('path');

// Importar las rutas de propietarios y fincas
const propietarioRoutes = require('./routes/propietarioRoutes');
const fincaRoutes = require('./routes/fincaRoutes');

const app = express();

// Configurar el motor de plantillas (asumiendo que estás usando EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar las sesiones
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Agregar un log para verificar la ruta del directorio de vistas
console.log('Directorio de vistas:', path.join(__dirname, 'views'));

// Usar las rutas importadas
app.get("/", (req, res) => { res.render('index'); });
app.use('/propietario', propietarioRoutes);
app.use('/finca', fincaRoutes);

// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
