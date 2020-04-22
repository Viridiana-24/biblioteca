const express = require('express');
const _ = require('underscore');
const Prestamo = require('../models/prestamo');
const app = express();

app.get('/prestamo', (req, res) => {
    Prestamo.find({ prestado: true })
        .populate('usuario')
        .populate('libro')
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            })
        });
});

app.post('/prestamo', (req, res) => {
    let body = req.body;

    let prestamo = new Prestamo({
        libro: body.libro,
        usuario: body.usuario,
        fecha: body.fecha
    });
    prestamo.save((err, presDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            presDB
        });
    });
});

app.put('/prestamo/:id', function (req, res){ ///:id
    let id = req.params.id;
    let body = _.pick(req.body, ['libro','usuario','fecha']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, presDB) => {
      if(err){
        return res.status(400).json({
            ok: false,
            mensaje: `Ocurrio un error al momento de actualizar ${err}`
        });
      }
      return res.json({
        ok: true,
        mensaje: 'Cambios guardados con exito',
        prestamo: presDB 
      });
    });
  });


app.delete('/prestamo/:id', function (req, res){
    let id = req.params.id;
 
 Prestamo.findByIdAndUpdate(id, { estado: false}, {new: true, runValidators: true, context: 'query' }, (err, resp)=>{
   if(err){
     return res.status(400).json({
       ok: false,
       mensaje: `Ocurrio un error al momento de eliminar un usuario ${err}`
 });
   }
   return res.json({
     ok: true,
     mensaje: 'Registro borrado con exito',
     resp
   });
 });
 });

module.exports = app;