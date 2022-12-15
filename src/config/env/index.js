module.exports = {
  app: {
    port: process.env.PORT,
    docsEnabled: process.env.DOCS_ENABLED,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION,
    s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE,
  },
  database: {
    endpoint: process.env.DATABASE_URL,
  },
  bucket: {
    endpoint: process.env.BUCKET_URL,
  },
};
