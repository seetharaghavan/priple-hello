var router = require('./routes'); 
var url = require('url'); 
var StringDecoder = require('string_decoder').StringDecoder;

module.exports = function(req, res){
	//Get the Url and parse it
	var parsedUrl = url.parse(req.url, true); 

	//Get the path
	var path = parsedUrl.pathname; 
	var trimmedPath = path.replace(/^\/+|\/+$/g,''); 

	//Get method
	var method = req.method.toUpperCase(); 

	//Get Query
	var query = parsedUrl.query; 

	//Parse Headers
	var headers = req.headers; 

	//Parsing the payload
	var decoder = new StringDecoder('utf-8'); 
	var buffer = '';

	//Append payload request to buffer 
	req.on('data', (data)=>{
		buffer += decoder.write(data); 
	}); 

	//End decoder upon the request is finished
	req.on('end', ()=>{

		buffer += decoder.end();
		//choose the handler and execute the cb;
		var chosenHandler = typeof(router[trimmedPath])!== 'undefined' 
		? router[trimmedPath] : router['notFound'];

		//construct the data object and send to the handler
		var data = {
			trimmedPath: trimmedPath,
			queryString: query,
			headers: headers,
			payload: buffer,
			method: method
		}

		chosenHandler(data, (statusCode, payload)=>{

			//use status code from handler or revert default to 200;
			statusCode = typeof(statusCode)=='number' ? statusCode : 200; 

			//use payload defined or default ot {}; 
			payload = typeof(payload) == 'object' ? payload : {}; 

			var payloadString = JSON.stringify(payload); 

			//Send the response
			res.setHeader('Content-Type', 'application/json'); 
			res.writeHead(statusCode); 

			res.end(payloadString); 

			//Log the request path
			console.log('Request '+method+' received on path: '
			+trimmedPath+ ' with status code ',statusCode); 
		});
	}); 
}