console.log("App.js funcionando");

const API = "http://localhost:3000/lerveiculos";
const APIPagamento = "http://localhost:3000/atualizarpagamento";
const APIDeletar = "http://localhost:3000/deletarveiculo";

async function carregar() {

    const res = await fetch(API); //fetch é requisição

    const dados = await res.json();

    const tabela = document.getElementById("tabela");

    //innerHTML limpa a tabela, para não ficar adicionando
    tabela.innerHTML = "";

    console.log(dados);

    dados.forEach((carro) => {
        tabela.innerHTML += `
        <tr>
            <td>${carro.id}</td>
            <td>${carro.placa}</td>
            <td>${carro.modelo}</td>
            <td>${carro.pago ? "✅Sim" : "❌Não"}</td>
            <td>
                <button onclick="pagar(${carro.id}, ${carro.pago})">
                    PATCH ${carro.pago ? '<span style="color:blue">Cancelar</span>' : '<span style="color:green">Pagar</span>'}
                </button>
                <button onclick="deletar(${carro.id})">
                    DELETE ${carro.id ? '<span style="color:red">Deletar</span>' : '<span style="color:blue">Cancelar</span>'}
                </button>
            </td>
        </tr>
        `
    });
}


async function pagar(id, pagoAtual) {
    console.log(id);
    console.log(pagoAtual);

    await fetch(`${APIPagamento}/${id}`,{
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({pago: !pagoAtual}) //o !pagoAtual inverte o valor
    });
    carregar();
}

async function deletar(id, deletar) {
    console.log(id);
    console.log(deletar);

    await fetch(`${APIDeletar}/${id}`,{
        method: "DELETE",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({carro: !deletar}) //o !deletar inverte o valor
    });
    carregar();
}

//------------------------------------------
//Ao abrir a página, chama a função carregar
//------------------------------------------
carregar();