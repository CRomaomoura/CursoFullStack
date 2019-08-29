export default class PortfolioClass{
    constructor(id, nome, descricao){
        if(id!=null) this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}