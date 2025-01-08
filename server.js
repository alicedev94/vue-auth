const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
require('./auth'); // Asegúrate de importar el archivo de autenticación

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Configurar la sesión
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Inicializar Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=> {
  res.send('s');
});

// Ruta de inicio de sesión con Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

// Callback de Google
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/protected');
  }
);

// Endpoint protegido
app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'Acceso concedido', user: req.user });
  } else {
    res.status(401).send('Acceso no autorizado');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
