import PessoaModel from '../../Models/PessoaModel.js';
import TelefoneModel from '../../Models/TelefoneModel.js';

export default async function ListPessoaApiController(req, res) {
    try {
        // Query params com valores padrão
        const {
            limit = 10,
            offset = 0,
            orderBy = 'id,asc'
        } = req.query;

        // Desestrutura e valida o campo de ordenação
        const [orderFieldRaw, orderDirectionRaw] = orderBy.split(',');

        const validFields = ['id', 'created_at', 'updated_at'];
        const validDirections = ['asc', 'desc'];

        const orderField = validFields.includes(orderFieldRaw) ? orderFieldRaw : 'id';
        const orderDirection = validDirections.includes(orderDirectionRaw?.toLowerCase()) ? orderDirectionRaw.toUpperCase() : 'ASC';

        const pessoas = await PessoaModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[orderField, orderDirection]],
            include: [{
                model: TelefoneModel,
                as: 'telefones'
            }]
        });

        return res.status(200).json(pessoas);

    } catch (error) {
        console.error('Erro ao listar pessoas:', error);
        return res.status(500).json({
            error: 'Erro ao buscar pessoas'
        });
    }
}