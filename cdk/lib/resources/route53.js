const { ARecord, HostedZone, RecordTarget } = require('aws-cdk-lib/aws-route53');
const { LoadBalancerTarget } = require('aws-cdk-lib/aws-route53-targets');

module.exports = class Route53 {
  createRecordA(loadBalance) {
    const loadBalancerAlias = new LoadBalancerTarget(loadBalance);

    new ARecord(this.stack, 'ARecord', {
      target: RecordTarget.fromAlias(loadBalancerAlias),
      recordName: `properpath-${this.appName}`,
      zone: this.zone,
    });
  }

  constructor(stack, { app, route53ZoneId, route53ZoneName }) {
    this.stack = stack;
    this.appName = app;

    this.zone = HostedZone.fromHostedZoneAttributes(stack, 'Zone', {
      zoneName: route53ZoneName,
      hostedZoneId: route53ZoneId,
    });
  }
};
