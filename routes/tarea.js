const express = require('express');
const router = express.Router();
const db = require('../db/conexionDB.js');



router.get('/', (req, res) => {
  db.query('SELECT ID, Descripcion, PersonaID, Fecha, Valor, Duracion FROM tarea', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});


router.post('/', (req, res) => {
  const { Descripcion, PersonaID, Fecha, Valor, Duracion } = req.body;


  if (!Descripcion || !PersonaID || !Fecha || !Valor || !Duracion) {
    res.status(400).send('Faltan datos requeridos');
  } else {

    const queryPersona = 'SELECT ID FROM persona WHERE ID = ?';
    db.query(queryPersona, [PersonaID], (error, resultPersona) => {
      if (error) throw error;
      if (resultPersona.length === 0) {
        res.status(404).send('No existe la persona con el ID proporcionado');
      } else {
   
        const queryTarea = 'INSERT INTO tarea (Descripcion, PersonaID, Fecha, Valor, Duracion) VALUES (?, ?, ?, ?, ?)';
        db.query(queryTarea, [Descripcion, PersonaID, Fecha, Valor, Duracion], (error, resultTarea) => {
          if (error) throw error;
          const id = resultTarea.insertId;
          res.json({
            Mensaje: 'Tarea creada correctamente',
            ID: id,
            Descripcion: Descripcion,
            PersonaID: PersonaID,
            Fecha: Fecha,
            Valor: Valor,
            Duracion: Duracion
          });
        });
      }
    });
  }
});

router.put('/', (req, res) => {
  const { ID, Descripcion, Fecha, Valor, Duracion } = req.body;
  const { length } = Object.keys(req.body);
  if (length <= 2) {
    res.status(400).send('Debe proporcionar al menos un campo adicional para actualizar la tarea');
    return;
  }
  const query = 'SELECT ID, Descripcion, PersonaID, Fecha, Valor, Duracion FROM tarea WHERE ID = ? AND PersonaID = ?';
  db.query(query, [req.body.ID, req.body.PersonaID], (error, result) => {
    if (error) throw error;
    if (result.length === 0) {
      res.status(404).send('No se encontró la tarea con el ID y PersonaID proporcionados');
    } else {
      const oldDescripcion = result[0].Descripcion;
      const oldFecha = result[0].Fecha;
      const oldValor = result[0].Valor;
      const oldDuracion = result[0].Duracion;

      const newDescripcion = Descripcion !== undefined ? Descripcion : oldDescripcion;
      const newFecha = Fecha !== undefined ? Fecha : oldFecha;
      const newValor = Valor !== undefined ? Valor : oldValor;
      const newDuracion = Duracion !== undefined ? Duracion : oldDuracion;

      const updateQuery = 'UPDATE tarea SET Descripcion = ?, Fecha = ?, Valor = ?, Duracion = ? WHERE ID = ? AND PersonaID = ?';
      db.query(updateQuery, [newDescripcion, newFecha, newValor, newDuracion, req.body.ID, req.body.PersonaID], (updateError, updateResult) => {
        if (updateError) throw updateError;
        res.json({
          Mensaje: 'Tarea actualizada correctamente',
          ID: ID,
          Descripcion: newDescripcion,
          Fecha: newFecha,
          Valor: newValor,
          Duracion: newDuracion,
          DescripcionAntigua: oldDescripcion,
          FechaAntigua: oldFecha,
          ValorAntiguo: oldValor,
          DuracionAntigua: oldDuracion
        });
      });
    }
  });
});


router.delete('/', (req, res) => {
  const { ID, PersonaID } = req.body;
  if (!ID || !PersonaID) {
    res.status(400).send('Faltan datos requeridos');
  } else {
    const selectQuery = 'SELECT ID, Descripcion, PersonaID, Fecha, Valor, Duracion FROM tarea WHERE ID = ? AND PersonaID = ?';
    db.query(selectQuery, [ID, PersonaID], (error, result) => {
      if (error) throw error;
      if (result.length === 0) {
        res.status(404).send('Tarea no encontrada');
      } else {
        const tarea = result[0];
        const deleteQuery = 'DELETE FROM tarea WHERE ID = ?';
        db.query(deleteQuery, [ID], (error, result) => {
          if (error) throw error;
          res.json({
            "Mensaje": "Tarea eliminada correctamente",
            "ID": tarea.ID,
            "PersonaID": tarea.PersonaID,
            "Descripcion": tarea.Descripcion,
            "Fecha": tarea.Fecha,
            "Valor": tarea.Valor,
            "Duracion": tarea.Duracion
          });
        });
      }
    });
  }
});

module.exports = router;