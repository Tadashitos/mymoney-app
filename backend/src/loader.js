const server = require('./config/server') //Recebendo o "server"
require('./config/database')
require('./config/routes')(server) //Enviando para o routes.js