const { Cluster } = require('aws-cdk-lib/aws-ecs');
const { Vpc } = require('aws-cdk-lib/aws-ec2');

module.exports = class ClusterResource {
  constructor(stack, { clusterName, vpcId }) {
    this.cluster = new Cluster(stack, 'Cluster', {
      clusterName,
      vpc: Vpc.fromLookup(this, 'VPC', {
        vpcId,
      }),
    });
  }
};
