import Pessoa from '../app/Models/PessoaModel.js';
import Telefone from '../app/Models/TelefoneModel.js';

// Uma Pessoa tem muitos Telefones
Pessoa.hasMany(Telefone, {
    foreignKey: 'id_pessoa',
    as: 'telefones'
});

// Um Telefone pertence a uma Pessoa
Telefone.belongsTo(Pessoa, {
    foreignKey: 'id_pessoa',
    as: 'pessoa'
});
