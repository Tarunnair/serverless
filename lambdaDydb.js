const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const { TABLE_NAME } = process.env;
exports.handler = async (event) => {
    const { pathParameters, httpMethod, body } = event;
    let { id } = pathParameters;
    let params,response ;
    switch(httpMethod){
        case 'GET':
            params = {
                TableName: TABLE_NAME,
                Key: {'id': id}
                };
            let getData = await docClient.get(params).promise();
            console.log("GETDATA", getData);
            if(getData.Item){
            response = {
                statusCode:200,
                body:JSON.stringify(getData.Item)
            };
            console.log(response);
            return response;
            }
            response = {
                statusCode:200,
                body:JSON.stringify('DATA NOT FOUND')
            };
            return response;
        case 'POST':
            console.log("BODY",JSON.parse(body));
            let { name='Tarun', sex='Male'} = JSON.parse(body);
             params = {
                TableName: TABLE_NAME,
                Item: {'id': id,
                'name':name || '',
                'sex': sex || null    
                }
             };
            let putBody = await docClient.put(params).promise();
            console.log(putBody);
            response = {
                statusCode:200,
                body:JSON.stringify('ITEM ADDED SUCCESSFULLY')
            };
            return response;
    }
};
