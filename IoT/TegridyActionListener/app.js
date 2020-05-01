const signalR = require("@microsoft/signalr");

var http = require('http');

// //create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

let connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/plantsActionsHub")
    .build();
 
connection.on("invokeAction", data => {
    console.log(data);
});
 
connection.start();
    //.then(() => connection.invoke("send", "Hello"));
