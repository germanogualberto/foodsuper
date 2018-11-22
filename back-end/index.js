const http = require('http');
const app = require('./config/express')();

const mongoUri = process.env.MONGODB_URI;

require('./config/database')(mongoUri || 'mongodb://localhost/foodsuper');
require('./config/passport')();

const port = app.get('port');

http.createServer(app).listen(port, () => {
  console.log(`Express Server listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile('./front-end/index.html', { root: __dirname });
});
app.get('/index.html', (req, res) => {
  res.sendFile('./front-end/index.html', { root: __dirname });
});
app.get('/addclient.html', (req, res) => {
  res.sendFile('./front-end/addclient.html', { root: __dirname });
});
app.get('/addsupermercado.html', (req, res) => {
  res.sendFile('./front-end/addsupermercado.html', { root: __dirname });
});
app.get('/login.html', (req, res) => {
  res.sendFile('./front-end/login.html', { root: __dirname });
});
app.get('/mainUsuario.html', (req, res) => {
  res.sendFile('./front-end/mainUsuario.html', { root: __dirname });
});
app.get('/updateclient.html', (req, res) => {
  res.sendFile('./front-end/updateclient.html', { root: __dirname });
});

app.get('/clients', (req, res) => {
  res.sendFile('./front-end/updateclient.html', { root: __dirname });
});
app.get('/supermercados.html', (req, res) => {
  res.sendFile('./front-end/supermercados.html', { root: __dirname });
});
app.get('/prateleira.html', (req, res) => {
  res.sendFile('./front-end/prateleira.html', { root: __dirname });
});
app.get('/pedidos.html', (req, res) => {
  res.sendFile('./front-end/pedidos.html', { root: __dirname });
});
app.get('/mainSupermercado.html', (req, res) => {
  res.sendFile('./front-end/mainSupermercado.html', { root: __dirname });
});
app.get('/produtos.html', (req, res) => {
  res.sendFile('./front-end/produtos.html', { root: __dirname });
});

