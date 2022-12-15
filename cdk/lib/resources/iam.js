const { Effect, PolicyStatement, Role, ServicePrincipal } = require('aws-cdk-lib/aws-iam');

module.exports = class Iam {
  constructor(stack, { dynamoTablesArn, dynamoTableIndexesArn }) {
    this.taskRole = new Role(stack, 'ScaffoldExecutionRole', {
      roleName: 'ScaffoldTaskRole',
      assumedBy: new ServicePrincipal(`ecs-tasks.amazonaws.com`),
    });

    const dynamoUsageStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem',
        'dynamodb:BatchWriteItem',
        'dynamodb:GetItem',
        'dynamodb:BatchGetItem',
        'dynamodb:Scan',
        'dynamodb:Query',
        'dynamodb:ConditionCheckItem',
      ],
      resources: [...dynamoTablesArn, ...dynamoTableIndexesArn],
    });

    this.taskRole.addToPrincipalPolicy(dynamoUsageStatement);
  }
};
