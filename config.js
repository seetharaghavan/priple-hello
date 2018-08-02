/*
*set development config
*/

var environments = {}; 

environments.development = {
	'port': 3000,
	'envName': 'development'
}

environments.production = {
	'port': 8080,
	'envName': 'production'
}

//determine which env was set by the user; 
var currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//set staging as default if any other env mentioned 
var envToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments['development']; 

module.exports = envToExport; 