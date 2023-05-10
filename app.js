const express = require('express');
const cors = require('cors');
const personaRouter = require('./routes/persona.js');
const tareaRouter = require('./routes/tarea.js');
const resumenValorRoute = require('./routes/resumenValor.js')
const detalleRoute = require('./routes/detalle')
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());




//RUTAS
app.use('/api/personas', personaRouter);
app.use('/api/tareas', tareaRouter);
app.use('/api/resumenvalor/', resumenValorRoute);
app.use('/api/detalle/', detalleRoute);




app.listen(3001, () => {
  console.log('Iniciado en el puerto 3001');
});
