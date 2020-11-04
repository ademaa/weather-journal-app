
// Setup empty JS object to act as endpoint for all routes
const projectData = {};
const port = '3000';
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
//send data again to client-side when calling updateUi function
app.get("/weatherData",(req,res)=>{
   res.send(projectData);
});
// recive data from client-side when calling addPost function and assign it to object
app.post("/weatherData",(req,res)=>{
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    projectData.date = req.body.date;
    res.send(projectData);
});
// Setup Server
app.listen(port,()=>{
  console.log(`server starts running at port ${port}`)
});
