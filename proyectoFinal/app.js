const express = require('express');
const app = express();
const router = require ('./router');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', router);

app.listen(5000, () => {
    console.log('server corriendo en http://localhost:5000');
});