const express = require('express');
//importando o cors que define quem terá acesso a aplicaão
const cors = require('cors');
//Identificando de onde vem a rota
const routes = require('./routes');

const app = express();
//utilizando o cors
app.use(cors());
//Identificado que as requisiões serão via json
//tem que vir antes das requisições
app.use(express.json());
app.use(routes);

  /*Métodos HTTP
   
  GET: buscar alguma informação no back-end
  POST: criar uma informação no back-end
  PUT: alterar informações no b-e
  DELETE: deletar informação no b-e
  */

  /* TIPOS DE PARÊMETROS
     
     QUERY PARAMS: parâmetros nomeados enviados na rota após "?" (filtros, paginação)
     ROUTE PARAMS: utilizados para idetificar recursos
     REQUEST BODY: corpo da requisição, usado para criar ou alterar recursos
  */

//Para startar o nodemon: npm start
//Para dar stop no nodemon: ctrl C

/* BANCO DE DADOS

   SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   NoSQL: MongoDB, CouchDB, etc
*/

/* MANEIRAS DE SE COMUNICAR COM O BANCO DE DADOS

   Baixando driver: SELECT * FROM users
   Query Builder: table('users').select('*').where(...)
*/

app.listen(3333);
