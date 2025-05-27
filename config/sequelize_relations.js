import PessoaModel from "../app/Models/PessoaModel.js";
import TelefoneModel from "../app/Models/TelefoneModel.js";

PessoaModel.hasMany(TelefoneModel, {
    foreignKey: 'id_pessoa',
    as: 'telefones'
});

TelefoneModel.belongsTo(PessoaModel, {
    foreignKey: 'id_pessoa',
    as: 'pessoa'
});