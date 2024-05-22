const db = require ('../database/db');

exports.save = (req,res)=>{
    const nombre = req.body.nombre;
    const apellidos = req.body.apellido;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const nota = req.body.nota; 
    const foto = req.file ? req.file.filename : null;

    db.run('INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion, nota, foto) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellidos, telefono, correo, direccion, nota, foto],
    (error) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });
 
}
