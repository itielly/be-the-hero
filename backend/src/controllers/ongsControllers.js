//importando a conexão com o banco de dados
const conection = require('../database/conection');
//usando para gerar um texto aleatório, será usado para primary key
const crypto = require('crypto');
 //COMO CRIAR ROTA
//async: usado juntamente do await(logo abaixo) faz 
    //com que a função espere o preenchimento dos dados para continuar
module.exports = {

    //para fazer listagem das ongs cadastradas
    async index(request, response) {
        const ongs = await conection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
    //Para garantir que o usuario nao vai preencher com dados inválidos
    const {name, email, whatsapp, city, uf} = request.body;

    //Setando o id, que terá 4 bytes e será hexadecimal
    const id = crypto.randomBytes(4).toString('HEX');

    //método insert para inserir dados em determinada tabela
    await conection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    //vai retornar apenas o id pois ele é o único gerado pelo sistema
    return response.json({ id });
    }
};