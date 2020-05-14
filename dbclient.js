'use strict';

const AWS = require('aws-sdk');
const AmazonDaxClient = require('amazon-dax-client');

const { DAX_CLUSTER_ENDPOINT, REGION } = process.env;

function createDynamoClient() {
  if (DAX_CLUSTER_ENDPOINT) {
    const dax = new AmazonDaxClient({ endpoints: [DAX_CLUSTER_ENDPOINT], region: REGION });
    return new AWS.DynamoDB.DocumentClient({ region: REGION, service: dax });
  }
  return new AWS.DynamoDB.DocumentClient({ region: REGION });
}
const client = createDynamoClient();

async function put(params) {
  return client.put(params).promise();
}

async function scan(params) {
  return client.scan(params).promise();
}

async function query(params) {
  return client.query(params).promise();
}

async function get(params) {
  return client.get(params).promise();
}

module.exports = {
  put,
  get,
  scan,
  query
};
