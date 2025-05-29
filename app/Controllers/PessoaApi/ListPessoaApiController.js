import Pessoa from '../../Models/PessoaModel.js';
import Telefone from '../../Models/TelefoneModel.js';

export default class ListPessoaApiController {
  static async index(req, res) {
    try {
      // Paginação
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;

      // Ordenação
      let order = [['id', 'ASC']]; // padrão
      if (req.query.orderBy) {
        const [field, direction] = req.query.orderBy.split(',');
        if (['id', 'created_at', 'updated_at'].includes(field) && ['asc', 'desc'].includes(direction.toLowerCase())) {
          order = [[field, direction.toUpperCase()]];
        }
      }

      // Consulta com associação
      const pessoas = await Pessoa.findAll({
        include: [
          {
            model: Telefone,
            as: 'telefones' // deve bater com o alias da relação no Sequelize
          }
        ],
        limit,
        offset,
        order
      });

      return res.status(200).json(pessoas);
    } catch (error) {
      console.error('Erro ao listar pessoas:', error);
      return res.status(500).json({ error: 'Erro ao buscar pessoas' });
    }
  }
}
