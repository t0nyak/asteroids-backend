const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

const port = 3123;

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
