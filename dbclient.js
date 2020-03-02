'use strict';

const region = 'region';//Specify the region
const endpoint = 'DAX ENDPOINT'; // specify the endpoint
const AWS = require('aws-sdk');
AWS.config.update({
  region: region
});

const AmazonDaxClient = require('amazon-dax-client');
let daxClient = null;
if (endpoint) {
  console.log('Dax Endpoint', endpoint, process.env.DAX_ENDPOINT);
  let dax = new AmazonDaxClient({ endpoints: [endpoint], region: region });
  daxClient = new AWS.DynamoDB.DocumentClient({ service: dax });
}
let docClient = new AWS.DynamoDB.DocumentClient();
let client = daxClient ? daxClient : docClient;

const query = (params) => {
  return new Promise((resolve, reject) => {
    client.query(params, (err, data) => {
      if (err)
        reject(err);
      else 
        resolve(data);
    }).on('error', (error) => {
      reject(error); //error found on event listener. this error is different from err.
    });
  });
}

const scan = (params) => {
  return client.scan(params).promise();
}

const dynamoQuery = (params) => {
  return new Promise((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err)
        reject(err);
      else 
        resolve(data);
    }).on('error', (error) => {
      reject(error); //error found on event listener. this error is different from err.
    });
  });
}

const put = (params) => client.put(params).promise();

const deleteObj = (params) => client.delete(params).promise();

const update = (params) => client.update(params).promise();

const get = (params) => {
  return new Promise((resolve, reject) => {
    client.get(params, (err, data) => {
      if (err)
        reject(err);
      else 
        resolve(data);
    }).on('error', (error) => {
      reject(error); //error found on event listener. this error is different from err.
    });
  });
}


module.exports = {
  query,
  scan,
  dynamoQuery,
  put,
  delete: deleteObj,
  update,
  get
};
