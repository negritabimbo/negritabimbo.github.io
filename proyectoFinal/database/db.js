const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./mydb.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Conexión a la base de datos SQLite establecida');

    let query = "CREATE TABLE IF NOT EXISTS empleados \
        ( id INTEGER PRIMARY KEY AUTOINCREMENT,\
        nombre TEXT,\
        apellidos TEXT,\
        telefono TEXT,\
        correo TEXT,\
        direccion TEXT,\
        nota TEXT,\
        foto TEXT);"

    db.run(query, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Tabla creada');
        }
    });
});

module.exports = db;