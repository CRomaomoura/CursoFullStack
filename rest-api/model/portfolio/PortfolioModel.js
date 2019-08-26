const db = require('../../banco/dbConexao');

module.exports = class PortifolioModel {
    static getTodos(callback) {
        return db.query("SELECT * FROM portfolio", callback);
    }
    static getId(id, callback) {
        return db.query("SELECT * FROM portfolio WHERE id = ?", [id], callback);
    }
    static adicionar(portfolio, callback) {
        return db.query("INSERT INTO portfolio (nome,descricao) VALUES (?,?)",
            [portfolio.nome, portfolio.descricao], callback);
    }
    static deletar(id, callback) {
        return db.query("DELETE FROM portfolio WHERE id = ?", [id], callback);
    }
    static editar(portfolio, callback) {
        return db.query("UPDATE portfolio SET nome = ?, descricao = ? WHERE id = ?",
            [portfolio.nome, portfolio.descricao, portfolio.id], callback);
    }
};
