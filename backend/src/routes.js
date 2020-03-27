const express = require('express');
//importando a rota da controller
const ongsController = require('./controllers/ongsControllers');
const incidentsControllers = require('./controllers/incidentsControllers');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

//rota de login
routes.post('/sessions', sessionController.create);

//rotas a serem seguidas conforme as controllers
routes.get('/ongs', ongsController.index);
routes.post('/ongs', ongsController.create);

routes.get('/incidents', incidentsControllers.index);
routes.post('/incidents', incidentsControllers.create);
//esse tem id como parametro pois ele precisa do id para deletar
routes.delete('/incidents/:id', incidentsControllers.delete);
//rota para procurar incidentes específicos
routes.get('/profile', profileController.index);

//Exportar rotas
module.exports = routes;