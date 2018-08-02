/*
*create a server and listens to the port
*/

//dependencies
var http = require('http'); 
var express = require('./express'); 
var config = require('./config'); 

//create a server
var server = http.createServer((req, res)=>{
	express(req, res); 
});



//start the server
server.listen(config.port, (req, res)=>{
	console.log('Server listening on '+config.port 
		+' in '+config.envName+' mode!')
});  
