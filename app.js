const ApiBuilder = require('claudia-api-builder'),
  AWS = require('aws-sdk');
var api = new ApiBuilder(),
  dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = api;

api.post('/notes', function (request) { // SAVE your note
  var params = {  
    TableName: 'notes',  
    Item: {
        //noteid: request.body.noteId,
        noteid: guid(),
        name: request.body.name // your note name
    } 
  }
  return dynamoDb.put(params).promise(); // returns dynamo result 
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/notes', function (request) { // GET all users
  return dynamoDb.scan({ TableName: 'notes' }).promise()
      .then(response => response.Items)
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
