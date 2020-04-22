const express = require('express');
const _ = require('underscore');
const Libro = require('../models/libro');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');


app.get('/libro', [verificaToken], (req, res) => {
    Libro.find({ disponible: true })
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            })
        });
});

app.post('/libro', [verificaToken], (req, res) => {
    let body = req.body;

    let libro = new Libro({
        nombre: body.nombre,
        autor: body.autor,
        genero: body.genero,
        img: body.img
    });
    libro.save((err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.put('/libro/', (req, res) => {
    let id = req.body.id;
    let body = _.pick(req.body, ['nombre', 'autor', 'genero', 'disponible']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.delete('/libro', (req, res) => {
    let id = req.body.id;
    Libro.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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