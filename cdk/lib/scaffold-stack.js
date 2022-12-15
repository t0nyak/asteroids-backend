const { Stack } = require('aws-cdk-lib');
const { ApplicationLoadBalancedFargateService } = require('aws-cdk-lib/aws-ecs-patterns');
const { ContainerImage, Secret } = require('aws-cdk-lib/aws-ecs');
const { ApplicationProtocol } = require('aws-cdk-lib/aws-elasticloadbalancingv2');
const Ecr = require('./resources/ecr');
const Iam = require('./resources/iam');
const SecretManager = require('./resources/secret-manager');
const Dynamodb = require('./resources/dynamodb');
const ClusterResource = require('./resources/cluster');
// const { Certificate } = require('aws-cdk-lib/aws-certificatemanager');
// const Route53 = require('./resources/route53');
// const Ssm = require('./resources/ssm');

module.exports = class ScaffoldStack extends Stack {
  static isRollback(dockerImageTag) {
    return dockerImageTag !== 'latest';
  }

  constructor(scope, id, props, buildConfig) {
    super(scope, id, props);

    const {
      App,
      Environment,
      Parameters: {
        Custer: { VPC_ID, CLUSTER_NAME },
        Dynamodb: { BILLING_MODE, TABLE_NAME },
        ECS: {
          TaskImage: {
            DOCKER_IMAGE_TAG,
            EnvVariables,
            CONTAINER_PORT,
            Secrets: { JWT_SECRET_ARN },
          },
          /* Networking: {
            SSM_VERSION_ROUTE_53_ZONE_ID,
            SSM_PATH_ROUTE_53_ZONE_ID,
            ROUTE_53_ZONE_NAME,
            CERTIFICATE_ARN,
          }, */
          TASK_MEMORY_LIMIT,
          TASK_CPU,
          DESIRED_TASK_COUNT,
        },
      },
    } = buildConfig;

    // eslint-disable-next-line security/detect-child-process, global-require
    const commitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim();

    const isRollback = this.isRollback(DOCKER_IMAGE_TAG);

    const dockerImageTag = this.isRollback(DOCKER_IMAGE_TAG) ? DOCKER_IMAGE_TAG : commitSha;

    const secretManager = new SecretManager(this, {
      jwtSecretArn: JWT_SECRET_ARN,
    });

    const ecr = new Ecr(
      this,
      { app: App, env: Environment, dockerImageTag, isRollback },
      buildConfig
    );

    /* const ssm = new Ssm(this, {
      pathRoute53ZoneId: SSM_PATH_ROUTE_53_ZONE_ID,
      versionRoute53ZoneId: SSM_VERSION_ROUTE_53_ZONE_ID,
    }); */

    /* const route53 = new Route53(this, {
      app: App,
      route53ZoneId: ssm.route53ZoneId,
      route53ZoneName: ROUTE_53_ZONE_NAME,
    }); */

    const { createdTable } = new Dynamodb(this, {
      tableName: TABLE_NAME,
      billingMode: BILLING_MODE,
    });

    const { dynamoTablesArn, dynamoTableIndexesArn } = Object.values([createdTable]).reduce(
      (acc, table) => ({
        dynamoTablesArn: [...acc.dynamoTablesArn, table.tableArn],
        dynamoTableIndexesArn: [...acc.dynamoTableIndexesArn, `${table.tableArn}/index/*`],
      }),
      { dynamoTablesArn: [], dynamoTableIndexesArn: [] }
    );

    const iam = new Iam(this, {
      dynamoTablesArn,
      dynamoTableIndexesArn,
    });

    const { cluster } = new ClusterResource(this, { clusterName: CLUSTER_NAME, vpcId: VPC_ID });

    new ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster,
      // certificate: Certificate.fromCertificateArn(this, 'Cert', CERTIFICATE_ARN),
      // redirectHTTP: true,
      targetProtocol: ApplicationProtocol.HTTP,
      memoryLimitMiB: TASK_MEMORY_LIMIT,
      assignPublicIp: true,
      cpu: TASK_CPU,
      desiredCount: DESIRED_TASK_COUNT,
      taskImageOptions: {
        image: ContainerImage.fromEcrRepository(ecr.repository, dockerImageTag),
        dockerLabels: { name: buildConfig.App, env: buildConfig.Environment },
        containerPort: CONTAINER_PORT,
        taskRole: iam.taskRole,
        containerName: buildConfig.App,
        environment: {
          ...EnvVariables,
        },
        secrets: {
          JWT_KEY: Secret.fromSecretsManager(secretManager.jwtPrivateTokenKey),
        },
      },
    });

    // route53.createRecordA(service.loadBalancer);
  }
};
