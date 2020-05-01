const signalR = require("@microsoft/signalr");

let connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/plantsActionsHub")
    .build();
 
connection.on("invokeAction", async data  => {
    await updateActionResult(data);
});
async function updateActionResult(data){
    await sleep(5000);

        let actionId = new Number(data);
        connection.invoke("updateActionResult", actionId, true).catch(err=>{
            console.log(err);
        })
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 
 
connection.start();
    //.then(() => connection.invoke("send", "Hello"));
