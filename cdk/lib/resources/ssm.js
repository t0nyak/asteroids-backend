const { StringParameter } = require('aws-cdk-lib/aws-ssm');

module.exports = class Ssm {
  constructor(stack, { pathRoute53ZoneId, versionRoute53ZoneId }) {
    this.route53ZoneId = StringParameter.fromStringParameterAttributes(stack, 'Route53ZoneId', {
      parameterName: pathRoute53ZoneId,
      version: versionRoute53ZoneId,
    }).stringValue;
  }
};
