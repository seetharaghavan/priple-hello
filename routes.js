/*
*all routes with handlers to be bootstrapped to the app
*/
var handler = require('./handler'); 

var routes = {
	'hello': handler.hello,
	'notFound': handler.notFound
}

module.exports = routes; 
