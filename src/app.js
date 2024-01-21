const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3300;

app.use(express.static(path.resolve(__dirname, "../public")));


app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/registro.html'));
})

app.get('/detalleProducto', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
})