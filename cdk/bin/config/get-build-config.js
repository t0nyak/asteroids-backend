const { ensureNumber, ensureString } = require('./utils');

exports.getConfig = (app, env) => {
  const unparsedEnv = app.node.tryGetContext(env);
  JSON.stringify(unparsedEnv);
  const {
    EcsStack: { AppEnvVariables, ...EcsStack },
    DynamoStack,
    ClusterStack,
  } = unparsedEnv.Parameters;

  return {
    AWSAccountID: ensureString(unparsedEnv, 'AWSAccountID'),
    AWSRegion: ensureString(unparsedEnv, 'AWSRegion'),

    App: ensureString(unparsedEnv, 'App'),
    Environment: ensureString(unparsedEnv, 'Environment'),

    Parameters: {
      Cluster: {
        VPC_ID: ensureString(ClusterStack, 'VPC_ID'),
        CLUSTER_NAME: ensureString(ClusterStack, 'CLUSTER_NAME'),
      },
      Dynamodb: {
        BILLING_MODE: ensureString(DynamoStack, 'BILLING_MODE'),
        TABLE_NAME: ensureString(DynamoStack, 'TABLE_NAME'),
      },
      ECS: {
        TASK_MEMORY_LIMIT: ensureNumber(EcsStack, 'TASK_MEMORY_LIMIT'),
        TASK_CPU: ensureNumber(EcsStack, 'TASK_CPU'),
        DESIRED_TASK_COUNT: ensureNumber(EcsStack, 'DESIRED_TASK_COUNT'),

        Networking: {
          SSM_VERSION_ROUTE_53_ZONE_ID: ensureNumber(EcsStack, 'SSM_VERSION_ROUTE_53_ZONE_ID'),
          SSM_PATH_ROUTE_53_ZONE_ID: ensureString(EcsStack, 'SSM_PATH_ROUTE_53_ZONE_ID'),
          ROUTE_53_ZONE_NAME: ensureString(EcsStack, 'ROUTE_53_ZONE_NAME'),
          CERTIFICATE_ARN: ensureString(EcsStack, 'CERTIFICATE_ARN'),
        },
        TaskImage: {
          DOCKER_IMAGE_TAG: ensureString(EcsStack, 'DOCKER_IMAGE_TAG'),
          CONTAINER_PORT: ensureNumber(EcsStack, 'CONTAINER_PORT'),
          EnvVariables: {
            BASE_URL: ensureString(AppEnvVariables, 'BASE_URL'),
            PORT: ensureString(AppEnvVariables, 'PORT'),
            DATABASE_URL: ensureString(AppEnvVariables, 'DATABASE_URL'),
            BUCKET_URL: ensureString(AppEnvVariables, 'BUCKET_URL'),
            AWS_REGION: ensureString(unparsedEnv, 'AWSRegion'),
          },
          Secrets: {
            JWT_SECRET_ARN: ensureString(EcsStack, 'JWT_SECRET_ARN'),
          },
        },
      },
    },
  };
};
