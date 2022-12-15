const { Secret } = require('aws-cdk-lib/aws-secretsmanager');

module.exports = class SecretManager {
  constructor(stack, { jwtSecretArn }) {
    this.jwtPrivateTokenKey = Secret.fromSecretCompleteArn(stack, 'SecretJwtKey', jwtSecretArn);
  }
};
