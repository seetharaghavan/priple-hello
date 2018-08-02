/*
handler functions for various routes
*/

var handler = {
	'hello': hello,
	'notFound': notFound
}; 

function hello(data, cb){
	cb (200, {'message': 'Hello from Restful Api\n'}); 
}

function notFound (data, cb){
	cb(404, {'message': 'Unauthorized / Route not exists\n'}); 
}

module.exports = handler; 

