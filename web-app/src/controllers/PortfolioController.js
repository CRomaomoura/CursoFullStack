import PortfolioModel from "../models/portfolio/PortfolioModel";
import PortfolioClass from "../models/portfolio/PortfolioClass";

let divMsg = window.document.getElementById("msg");
let divPortfolios = window.document.getElementById("portfolios");
let formulario = window.document.getElementById("form");

let objPortfolioController;

class PortfolioController{

    getTodosTable(divPortfolios){
        let promise = new Promise(function(resolve, reject){
            let promiseFetch = PortfolioModel.getTodos();
            
            promiseFetch.then(response =>{
                resolve(response);
            });
        })

        promise.then(response =>{
            let dados = "";

            if(response.erro){
                this.exibirMsgAlert(response.msg, 'erro');
            }else{
                dados += `<div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover table-sm">
                        <thead class="table-dark">
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th></th>
                                <th></th>
                            </th>
                        </thead>
                        <tbody>`;

                for(const servico of response.dados){
                    dados += `<tr>
                            <td>${servico.id}</td>
                            <td>${servico.nome}</td>
                            <td><button type="button" class="btn btn-primary btn-editar" data-id="${servico.id}">Editar</button></td>
                            <td><button type="button" class="btn btn-primary btn-excluir" data-id="${servico.id}">Excluir</button></td>
                        </tr>`;
                       
                }    

                dados += "</tbody></table></div>";
                divPortfolios.innerHTML = dados;

                let btnsEditar = document.querySelectorAll(".btn-editar");
                let btnsExcluir= document.querySelectorAll(".btn-excluir");

                btnsEditar.forEach(function(item){
                    item.addEventListener("click", event =>{
                        objPortfolioController.limparMsgAlert();
                        let id = event.target.getAttribute('data-id');
                        objPortfolioController.prepararEditar(id);
                    } );
                });

                btnsExcluir.forEach(function(item){
                    item.addEventListener("click", event =>{
                        objPortfolioController.limparMsgAlert();
                        let id = event.target.getAttribute('data-id');
                        objPortfolioController.deletar(id);
                    } );
                });
            }
        }).catch(response => console.log("erro catch:", response));
    }

    prepararEditar(id){
        
            let promise = new Promise(function(resolve, reject){
                let promiseFetch = PortfolioModel.getId(id);
                
                promiseFetch.then(response =>{
                    resolve(response);
                });
            })
    
            promise.then(response =>{
                if(response.erro){
                    this.exibirMsgAlert(response.msg,"erro");
                }else{

                    let objPortfolioClass = new PortfolioClass(
                        response.dados[0].id,
                        response.dados[0].nome, 
                        response.dados[0].descricao);
                    
                    formulario.id.value = objPortfolioClass.id;
                    formulario.nome.value = objPortfolioClass.nome;
                    formulario.descricao.value = objPortfolioClass.descricao;

                    objPortfolioController.ocultarElemento("listagem");
                    objPortfolioController.exibirElemento("formulario");                  
                }
            }).catch(response => {
                console.log("erro catch:", response);
            });
    };

    editar(formulario){
        let id, nome, descricao;
        id = formulario.id.value;
        nome = formulario.nome.value;
        descricao = formulario.descricao.value;

        if(id && nome && descricao){
            let objPortfolioClass = new PortfolioClass(id, nome, descricao);

            let promise = new Promise(function(resolve, reject){
                let promiseFetch = PortfolioModel.editar(objPortfolioClass);
                
                promiseFetch.then(response =>{
                    resolve(response);
                });
            })
    
            promise.then(response =>{
                if(response.erro){
                    this.exibirMsgAlert(response.msg,"erro");
                }else{
                    objPortfolioController.getTodosTable(divPortfolios);
                    objPortfolioController.exibirMsgAlert(response.msg,"sucesso");
                    objPortfolioController.ocultarElemento("formulario");
                    objPortfolioController.exibirElemento("listagem");
                    objPortfolioController.limparCamposForm(formulario);                    
                }
            }).catch(response => {
                console.log("erro catch:", response);
            });

        }else{
            this.exibirMsgAlert("Por favor preencher todos os campos.","erro");
        }
    }

    adicionar(formulario){
        let nome, descricao;
        nome = formulario.nome.value;
        descricao = formulario.descricao.value;

        if(nome && descricao){
            let objPortfolioClass = new PortfolioClass(null, nome, descricao);

            let promise = new Promise(function(resolve, reject){
                let promiseFetch = PortfolioModel.adicionar(objPortfolioClass);
                
                promiseFetch.then(response =>{
                    resolve(response);
                });
            })
    
            promise.then(response =>{
                if(response.erro){
                    this.exibirMsgAlert(response.msg,"erro");
                }else{
                    objPortfolioController.getTodosTable(divPortfolios);
                    objPortfolioController.exibirMsgAlert(response.msg,"sucesso");
                    objPortfolioController.ocultarElemento("formulario");
                    objPortfolioController.exibirElemento("listagem");
                    objPortfolioController.limparCamposForm(formulario);                    
                }
            }).catch(response => {
                console.log("erro catch:", response);
            });

        }else{
            this.exibirMsgAlert("Por favor preencher todos os campos.","erro");
        }
    }

    deletar(id){
        
        let promise = new Promise(function(resolve, reject){
            let promiseFetch = PortfolioModel.deletar(id);
            
            promiseFetch.then(response =>{
                resolve(response);
            });
        })

        promise.then(response =>{
            if(response.erro){
                this.exibirMsgAlert(response.msg,"erro");
            }else{
                objPortfolioController.getTodosTable(divPortfolios);
                objPortfolioController.exibirMsgAlert(response.msg,"sucesso");                   
            }
        }).catch(response => {
            console.log("erro catch:", response);
        });
    };

    ocultarElemento(elemento){
        document.getElementById(elemento).style.display = "none";
    
    }

    exibirElemento(elemento){
        document.getElementById(elemento).style.display = "block";
    }

    limparCamposForm(form){
        form.id.value = "";
        form.nome.value = "";
        form.descricao.value = "";
    }

    exibirMsgAlert(msg, tipo){
        let dados = "";
        if(tipo == "sucesso"){
            dados = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${msg}</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
        }else if(tipo == "erro"){
            dados = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${msg}</strong> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`
        }

        divMsg.innerHTML = dados;
    }

    limparMsgAlert(){
        divMsg.innerHTML = "";
    }

    registrarEvents(){
        document.getElementById('btn-exibir-formulario').addEventListener("click",function(){
            objPortfolioController.limparMsgAlert();
            objPortfolioController.ocultarElemento("listagem");
            objPortfolioController.exibirElemento("formulario");
        });

        document.getElementById('btn-cadastrar-portfolio').addEventListener("click",function(){
           event.preventDefault();
           objPortfolioController.limparMsgAlert();
           if(formulario.id.value){
               objPortfolioController.editar(formulario);
           }else{
               objPortfolioController.adicionar(formulario);
           }
        });

        document.getElementById('btn-cancelar-operacao').addEventListener("click",function(){
            objPortfolioController.limparMsgAlert();
            objPortfolioController.limparCamposForm(formulario);
            objPortfolioController.ocultarElemento("formulario");
            objPortfolioController.exibirElemento("listagem");
        });
    }

    

}

function main(){
    objPortfolioController = new PortfolioController();
    objPortfolioController.ocultarElemento("formulario");    
    objPortfolioController.getTodosTable(divPortfolios);
    objPortfolioController.registrarEvents();
}

window.onload = main;