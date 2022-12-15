const { App } = require('aws-cdk-lib');
const SnailStack = require('../lib/snail-stack');
const { getConfig } = require('./config/get-build-config');

const app = new App();

const buildConfigDev = getConfig(app, 'dev');

new SnailStack(
  app,
  `${buildConfigDev.App}-${buildConfigDev.Environment}-stack`,
  {
    env: {
      account: buildConfigDev.AWSAccountID,
      region: buildConfigDev.AWSRegion,
    },
  },
  buildConfigDev
);
