const { App } = require('aws-cdk-lib');
const ScaffoldStack = require('../lib/scaffold-stack');
const { getConfig } = require('./config/get-build-config');

const app = new App();

const buildConfigDev = getConfig(app, 'dev');

new ScaffoldStack(
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
