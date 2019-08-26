var express = require('express');
var router = express.Router();
var PortfolioModel = require('../model/portfolio/PortfolioModel.js');
var RespostaClass = require('../model/RespostaClass.js');

router.get("/", function (req, res, next) {
    PortfolioModel.getTodos(function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('erro: ', erro);
        } else {
            resposta.dados = retorno;
        }
        res.json(resposta);
    });
});

router.get("/:id?", function (req, res, next) {
    PortfolioModel.getId(req.params.id, function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('erro: ', erro);
        } else {
            resposta.dados = retorno;
        }
        res.json(resposta);
    });
});

router.post("/?", function (req, res, next) {
    PortfolioModel.adicionar(req.body, function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('erro: ', erro);
        } else {
            if (retorno.affectedRows > 0) {
                resposta.msg = "Cadastrado com sucesso!";
            } else {
                resposta.erro = true;
                resposta.msg = "Dado não foi adicionado!";
            }
        }
        console.log('Resposta: ', resposta);
        res.json(resposta);
    });
});

router.delete("/:id", function (req, res, next) {
    PortfolioModel.deletar(req.params.id, function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('erro: ', erro);
        } else {
            if (retorno.affectedRows > 0) {
                resposta.msg = "Registro excluído com sucesso!";
            } else {
                resposta.erro = true;
                resposta.msg = "Dado não foi excluído!";
            }
        }
        console.log('Resposta: ', resposta);
        res.json(resposta);
    });
});

router.put("/", function (req, res, next) {
    PortfolioModel.editar(req.body, function (erro, retorno) {
        let resposta = new RespostaClass();
        if (erro) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('erro: ', erro);
        } else {
            if (retorno.affectedRows > 0) {
                resposta.msg = "Cadastro atualizado com sucesso!";
            } else {
                resposta.erro = true;
                resposta.msg = "Dado não foi alterado!";
            }
        }
        console.log('Resposta: ', resposta);
        res.json(resposta);
    });
});
module.exports = router;