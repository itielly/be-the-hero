const conection = require('../database/conection');

//a função desse método é apenas checar se a ong existe no sistema
module.exports = {
    async create(request, response) {
      //o id virá atraves do corpo da requisião
      const { id } = request.body;

      const ong = await conection('ongs')
      .where('id', id)
      .select('name')
      .first();

      if(!ong) {
          return response.status(400).json({ error: 'NO ONG found with this ID'});
      }

      return response.json(ong);
    }
}