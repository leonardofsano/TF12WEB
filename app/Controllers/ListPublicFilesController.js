import PessoaModel from '../Models/PessoaModel.js';
import TelefoneModel from '../Models/TelefoneModel.js';

export default async function ListPessoaApiController(req, res) {
    try {
        // Query params com valores padrão
        const {
            limit = 10,
            offset = 0,
            orderBy = 'id,asc'
        } = req.query;

        // Validação de limit e offset
        const limitNumber = Number.isNaN(parseInt(limit)) ? 10 : parseInt(limit);
        const offsetNumber = Number.isNaN(parseInt(offset)) ? 0 : parseInt(offset);

        // Desestrutura e valida o campo de ordenação
        const [orderFieldRaw, orderDirectionRaw] = orderBy.split(',');

        const validFields = ['id', 'created_at', 'updated_at'];
        const validDirections = ['asc', 'desc'];

        const orderField = validFields.includes(orderFieldRaw) ? orderFieldRaw : 'id';
        const orderDirection = validDirections.includes(orderDirectionRaw?.toLowerCase()) ? orderDirectionRaw.toUpperCase() : 'ASC';

        const pessoas = await PessoaModel.findAll({
            limit: limitNumber,
            offset: offsetNumber,
            order: [[orderField, orderDirection]],
            include: [{
                model: TelefoneModel,
                as: 'telefones'
            }]
        });

        return res.status(200).json({
            success: true,
            data: pessoas
        });

    } catch (error) {
        console.error('Erro ao listar pessoas:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar pessoas'
        });
    }
}
