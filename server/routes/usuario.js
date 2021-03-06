const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');

app.get('/usuario',  (req, res) => {
    Usuario.find({ estado: true })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }                       ////entonces primero se elimina, guardas, commmit inicial 2, 3, origin, heroku, diploy, clic para compliar otravez 
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            })
        });
});    

app.post('/usuario',[verificaToken], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        
    });
    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.put('/usuario/:id', function (req, res){
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','email']);
 
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query'}, (err, usrDB) => {
      if(err){
        return res.status(400).json({
            ok: false,
            mensaje: `Ocurrio un error al momento de actualizar ${err}`
        });
      }
      return res.json({
        ok: true,
        mensaje: 'Cambios guardados con exito',
        usuario: usrDB 
      });
    });
  });

app.delete('/usuario/:id', (req, res) => {
    let id = req.body.id;
    // Usuario.deleteOne({ _id: id }, (err, resp) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (resp.deletedCount === 0) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 id,
    //                 msg: 'Usuario no encontrado'
    //             }
    //         });
    //     }
    //     return res.status(200).json({
    //         ok: true,
    //         resp
    //     });
    // });

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;