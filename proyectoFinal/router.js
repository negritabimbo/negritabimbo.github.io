const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('./database/db');


// Configuración de multer para guardar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) =>{
    
    
    db.all('SELECT * FROM empleados', (error, results) => 
        {
        if (error){
            throw error;
        }
        else{
            res.render('index',{results:results});
        }
    })
})

router.get('/admin', (req, res) =>{
    db.all('SELECT * FROM empleados', (error, results) => 
        {
        if (error){
            throw error;
        }
        else{
            res.render('create',{results:results});
        }
    })
})

router.get('/update/:id', (req, res) =>{
    const id = req.params.id;
    console.log('matricula: ', id);
    db.get('SELECT * FROM empleados WHERE id=?',[id], (error,results)=>
        {
            if(error){
                throw error;
            }else {
                res.render('edit', {user:results});
            }
        })
})



router.post('/editar/:id', upload.single('foto'), (req, res) =>{
    const id = req.params.id;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellido;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const direccion = req.body.direccion; 
    const nota = req.body.nota;
    const foto = req.file ? req.file.filename : null;

    db.run('UPDATE empleados SET nombre = ?, apellidos = ?, telefono = ?, correo = ?, direccion = ?, nota = ?, foto = ? WHERE id = ?',
    [ nombre, apellidos, telefono, correo, direccion, nota, foto, id],
    (error) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/admin');
        }
    });
})

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    res.render('delete', { id: id });
});

router.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    const confirmation = req.body.confirmation;

    if (confirmation === 'yes') {
        db.run('DELETE FROM empleados WHERE id = ?', [id], (error, result) => {
            if (error) {
                throw error;
            } else {
                res.redirect('/admin');
            }
        });
    } else {
        res.redirect('/admin');
    }
});

router.get('/mas/:id', (req, res) =>{
    const id = req.params.id;
    console.log('matricula: ', id);
    db.get('SELECT * FROM empleados WHERE id=?',[id], (error,results)=>
        {
            if(error){
                throw error;
            }else {
                res.render('mas', {user:results});
            }
        })
})

router.get('/search', (req, res) => {
    res.render('search');
})

router.get('/buscar', (req, res) => {
    const nombre = `%${req.query.nombre}%`;
    console.log('nombre: ', nombre);
    const users = db.all('SELECT * FROM empleados WHERE nombre LIKE ? ', [nombre],
    (error, rows) => {
        if (error) {
            console.log(error);
        } else {
            console.log('rows: ', rows);
            res.json(rows);
        }
    });
});

router.get('/buscarNombre', (req, res) => {
    const nombre = req.query.nombre;
    console.log('nombre: ', nombre);
    db.all('SELECT * FROM empleados WHERE nombre LIKE ?', [nombre],
    (error, rows) => {
        if (error) {
            console.log(error);
        } else {
            console.log('rows: ', rows);
            res.render('buscar', {resultados:rows});
        }
    });
});

const crud = require('./controladores/crud');
router.post('/save', upload.single('foto'), crud.save);


module.exports = router;