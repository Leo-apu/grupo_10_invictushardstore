const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3300;

app.use(express.static(path.resolve(__dirname, "../public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views'));


app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

// app.get('/registro', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/registro.html'));
// })
// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/login.html'));
// })


// app.get('/registro', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/registro.html'));
// })

//app.get('/login', (req, res) => {
//    res.sendFile(path.join(__dirname, '/views/login.html'));
//})

//app.get('/registro', (req, res) => {
//    res.sendFile(path.join(__dirname, '/views/registro.html'));
//})


// app.get('/detalleProducto', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/productDetail.html'));
// })

const productCartRoute = require('./routes/productCartRoutes.js')
app.use('/', productCartRoute);

const crearProductoRoute = require('./routes/crearProductoRoutes.js')
app.use('/', crearProductoRoute);

const modificarProductoRoute = require('./routes/modificarProductoRoutes.js')
app.use('/', modificarProductoRoute);