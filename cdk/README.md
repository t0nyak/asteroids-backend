# Snail deployment

### How to deploy

If you're changes happens inside `lib/stacks` folder, all you need to do is merge with dev and changes will be apply
If you have done changes somewhere, you'll need to manually run `cdk deploy --all`.
In case you change something inside `lib/staks` and something from other place, you'll need to first push your changes and then run `cdk deploy --all`

## Some hints

- In order to build a docker image which depends on a private `package` hosted by GitHub, the container needs to be authenticated
  This is achieved by creating a `.npmrc` with an access token, adding gitlab as `known host` and setting a special `ssh private key` on the container

  This is straightforward if you're building your image running `docker build` since
  they already provide you with tools to forward the host ssh private key to the container [reference](https://docs.docker.com/develop/develop-images/build_enhancements/#using-ssh-to-access-private-data-in-builds).

  But sadly, CDK doesn't allow this behavior yet as we can see on this [issue](https://github.com/aws/aws-cdk/issues/12062)

  This is why I'm creating the `id_ed25519` file at pipeline's beginning, so I can copy it inside docker context and use it for authentication
