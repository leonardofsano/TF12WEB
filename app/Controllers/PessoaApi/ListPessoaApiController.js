import Pessoa from '../../Models/PessoaModel.js';
import Telefone from '../../Models/TelefoneModel.js';

class ListPessoaApiController {
  async list(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const orderBy = req.query.orderBy || 'id,asc';

      const [orderField, orderDirection] = orderBy.split(',');
      const allowedFields = ['id', 'created_at', 'updated_at'];
      const allowedDirections = ['asc', 'desc'];

      const field = allowedFields.includes(orderField) ? orderField : 'id';
      const direction = allowedDirections.includes(orderDirection) ? orderDirection : 'asc';

      const pessoas = await Pessoa.findAll({
        include: {
          model: Telefone,
          as: 'telefones'
        },
        limit,
        offset,
        order: [[field, direction]]
      });

      res.json(pessoas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

export default new ListPessoaApiController();
