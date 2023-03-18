const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { pool, sql } = require('./config/database')
const app = express();
const routes = require('./routes/index')


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(cors());

//Routes api
app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});