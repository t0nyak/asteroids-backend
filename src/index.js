require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const {
  app: { port, docsEnabled },
  aws: { accessKeyId, secretAccessKey, sessionToken, region, s3ForcePathStyle },
} = require('./config/env');
const swagger = require('./config/docs/swagger');

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
  s3ForcePathStyle,
  ...(sessionToken ? { sessionToken } : {}),
});

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/', routes);

if (docsEnabled === 'true') {
  app.use('/swagger', swagger);
  app.use('/docs', express.static(`${__dirname}/out/docs`));
}

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
