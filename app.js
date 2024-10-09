require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');
const nocache = require('nocache');
const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 13000;

// Conectar ao Banco de Dados
connectDB();

// Configurações de Middleware
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Motor de Templates
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Configuração de Cookies e Sessões
app.use(cookieParser('blognetninja'));
app.use(session({
  secret: 'BlognetninjaSecretSession',
  saveUninitialized: true,
  resave: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  })
}));
app.use(flash());
app.use(fileUpload());


// Variáveis Locais Globais
app.locals.isActiveRoute = isActiveRoute;

// Rotas
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

// Inicialização do Servidor
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
