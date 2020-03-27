//importando o knex
const knex = require('knex');
//importando a configuração do banco
const configuration = require('../../knexfile');

//development é uma das configurações do banco
const conection = knex(configuration.development);

//exportar a conexão com o banco de dados
module.exports = conection;
