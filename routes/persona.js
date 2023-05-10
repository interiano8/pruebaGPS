const express = require('express');
const router = express.Router();
const db = require('../db/conexionDB.js');

router.get('/', (req, res) => {
  db.query('SELECT ID, Nombre FROM persona', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { Nombre } = req.body;
  if (!Nombre) {
    res.status(400).send('Nombre no proporcionado');
  } else {
    const query = 'INSERT INTO persona (Nombre) VALUES (?)';
    db.query(query, [Nombre], (error, result) => {
      if (error) throw error;
      const id = result.insertId;
      res.json({
        Mensaje: 'Persona creada correctamente',
        ID: id,
        Nombre: Nombre
      });
    });
  }
});

router.put('/', (req, res) => {
  const { ID, NombreNew, NombreOld } = req.body;
  if (!ID || !NombreNew || !NombreOld) {
    res.status(400).send('Faltan datos requeridos');
  } else {
    const selectQuery = 'SELECT ID, Nombre FROM persona WHERE ID = ? AND Nombre = ?';
    db.query(selectQuery, [ID, NombreOld], (error, result) => {
      if (error) throw error;
      if (result.length === 0) {
        res.status(404).send('Persona no encontrada');
      } else {
        const updateQuery = 'UPDATE persona SET Nombre = ? WHERE ID = ?';
        db.query(updateQuery, [NombreNew, ID], (error, result) => {
          if (error) throw error;
          res.json({
            Mensaje:"Nombre Actualizado Correctamente",
            "ID":ID,
            "Nombre Anterior":NombreOld,
            "Nombre Nuevo": NombreNew
          });
        });
      }
    });
  }
});

router.delete('/', (req, res) => {
  const { ID, Nombre } = req.body;
  if (!ID || !Nombre) {
    res.status(400).send('Faltan datos requeridos');
  } else {
    const selectQuery = 'SELECT ID, Nombre FROM persona WHERE ID = ? AND Nombre = ?';
    db.query(selectQuery, [ID, Nombre], (error, result) => {
      if (error) throw error;
      if (result.length === 0) {
        res.status(404).send('Persona no encontrada');
      } else {
        const deleteQuery = 'DELETE FROM persona WHERE ID = ?';
        db.query(deleteQuery, [ID], (error, result) => {
          try {
            if (error) throw error;
            res.json({
              "Mensaje": "Persona eliminada correctamente",
              "ID":ID,
              "Nombre":Nombre
            });
          } catch (error) {
            if (error.errno === 1451) {
              res.status(400).send('No se puede eliminar la persona porque tiene tareas asociadas');
            } else {
              throw error;
            }
          }
        });
      }
    });
  }
});



module.exports = router;
