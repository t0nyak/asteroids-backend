// eslint-disable-next-line no-unused-vars
const { BillingMode, AttributeType, Table } = require('aws-cdk-lib/aws-dynamodb');

module.exports = class Dynamodb {
  getBillingModeParameters(config) {
    return {
      ...(config.BILLING_MODE === BillingMode.PAY_PER_REQUEST
        ? {
            billingMode: BillingMode.PAY_PER_REQUEST,
          }
        : {
            billingMode: BillingMode.PROVISIONED,
            readCapacity: config.READ_CAPACITY,
            writeCapacity: config.WRITE_CAPACITY,
          }),
    };
  }

  createTable(stack, tableName, config) {
    throw new Error(`TODO ${stack}, ${tableName}, ${config}`);
  }

  constructor(stack, { tableName, billingMode }) {
    this.createdTable = this.createTable(stack, tableName, billingMode);
  }
};
