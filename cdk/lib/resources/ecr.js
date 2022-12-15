const { Repository, TagMutability } = require('aws-cdk-lib/aws-ecr');
const { DockerImageAsset } = require('aws-cdk-lib/aws-ecr-assets');
const { ECRDeployment, DockerImageName } = require('cdk-ecr-deployment');

module.exports = class Ecr {
  constructor(stack, { app, env, dockerImageTag, isRollback }) {
    this.repository = new Repository(stack, 'Repository', {
      repositoryName: `${app}-${env}`,
      imageTagMutability: TagMutability.IMMUTABLE,
    });

    if (!isRollback) {
      const image = new DockerImageAsset(stack, 'DockerImage', {
        directory: '..',
        file: 'config/docker/Dockerfile',
      });
      new ECRDeployment(stack, 'DeployDockerImage', {
        src: new DockerImageName(image.imageUri),
        dest: new DockerImageName(`${this.repository.repositoryUri}:${dockerImageTag}`),
      });
    }
  }
};
