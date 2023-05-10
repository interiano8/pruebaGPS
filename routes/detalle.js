const express = require('express');
const router = express.Router();
const db = require('../db/conexionDB.js');


router.post('/', (req, res) => {
    const { Fecha, PersonaID } = req.body;
    if (!Fecha || !PersonaID) {
      res.status(400).send('Datos incompletos');
    } else {
      const query = `SELECT ID,(Select Nombre From persona where ID=PersonaID) as Nombre,  Descripcion, PersonaID, Fecha, Valor, Duracion FROM tarea where DATE(fecha)=? and PersonaID =?`;
      db.query(query, [Fecha, PersonaID], (error, result) => {
        if (error) throw error;
  
        if (result.length === 0) {
          res.status(404).json({ mensaje: 'No se encontraron Tareas para PersonaID o fecha proporcionados' });
        } else {
          res.json(result);
        }
      });
    }
  });
  

  
  

  module.exports = router;