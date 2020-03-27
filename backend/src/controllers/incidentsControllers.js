const conection = require('../database/conection');

//exportando o método
module.exports = {
    //método para listar os casos cadastrados
    async index(request, response){
      const { page = 1 } = request.query;

      //variável que irá contar quantos casos a ong tem
      const [count] = await conection('incidents')
      .count();

      const incidents = await conection('incidents')
    //restringindo a pagina para que apareça apenas 5 casos por vez
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1)*5)
    .select([
             'incidents.*', 
             'ongs.name', 
             'ongs.email',
             'ongs.whatsapp',
             'ongs.city',
             'ongs.uf'
            ]);

    //será pego a resposta do count pelo header do insominia
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);    
  },

    async create(request, response) {
     //adicionando dados a tabela de incidentes
     const {title, description, value} = request.body; 
     //pegando o ID da ong cadastrada
     const ong_id = request.headers.authorization;

     const [ id ] = await conection('incidents').insert({
       title,
       description,
       value,
       ong_id,
     });
     return response.json({ id });
    },
    //método para deletar incidents
    async delete(request, response){
        //passando o id como parametro
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await conection('incidents')
          //testando se o id que está tentando deletar é o mesmo id que criou o incident
          .where('id', id)
          .select('ong_id')
          .first();

          if (incidents.ong_id != ong_id){
   
              return response.status(401).json({error: 'Operation not permitted' });

          }
          await conection('incidents').where('id', id).delete();
          //retorna que deu sucesso, porém como a 
          //operação não terá corpo envia-se uma resposta vazia com status
          return response.status(204).send();

    
    }
};