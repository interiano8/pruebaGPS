const express = require('express');
const router = express.Router();
const db = require('../db/conexionDB.js');

router.get('/:PersonaID', (req, res) => {
    const { PersonaID } = req.params;
    const selectQuery = 'SELECT PersonaID FROM tarea WHERE PersonaID = ?';
    db.query(selectQuery, [PersonaID], (error, result) => {
      if (error) throw error;
      if (result.length === 0) {
        res.status(404).send('No hay registro para esta Persona');
      } else {
        const query = `
          SELECT PersonaID,(Select Nombre From persona where ID=PersonaID) as Nombre, SUM(Valor) as Total, SEC_TO_TIME(SUM(TIME_TO_SEC(Duracion))) as TotalHoras 
          FROM tarea 
          WHERE PersonaID= ?
        `;
        db.query(query, [PersonaID], (error, results) => {
          if (error) throw error;
          res.json(results);
          console.log(results);
        });
      }
    });
  });
  
  
  
  module.exports = router;

