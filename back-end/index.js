const http = require('http');
const app = require('./config/express')();

const mongoUri = process.env.MONGODB_URI;

require('./config/database')(mongoUri || 'mongodb://localhost/foodsuper');
require('./config/passport')();

const port = app.get('port');

http.createServer(app).listen(port, () => {
  console.log(`Express Server listening on port ${port}`);
});
