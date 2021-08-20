// Imports para começar a construir o código.
const formCadastro = document.querySelector("#cadastro");
const inputNome = document.querySelector("#nomeProduto");
const inputQtd = document.querySelector("#quantidade");
const inputCategoria = document.querySelector("select");
const inputValor = document.querySelector("#valor");
const tbody = document.querySelector("tbody");
const cardPedido = document.querySelector("#cardPedido");
const botaoFinalizar = document.querySelector("#botaoFinalizar");
// declaração de variaveis para pegar os valores do total do pedido.
let valordeProdutos = 0;
let valorRetirado = 0;
//Escutando o evento de submit do formulario para adiconar o produto.
formCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const tr = document.createElement("tr");

    const tdNome = document.createElement("td");
    const tdQtd = document.createElement("td");
    const tdCategoria = document.createElement("td");
    const tdValor = document.createElement("td");
    const tdTotal = document.createElement("td");
    tdTotal.classList.add("valorTotal");
    const tdExcluir = document.createElement("td");

    tdNome.innerText = inputNome.value;
    tdQtd.innerText = inputQtd.value;
    tdCategoria.innerText = inputCategoria.value;
    // mudança para o valor ficar no estilo moeda.
    tdValor.innerText = (inputValor.value * 1).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
    });
    tdTotal.innerText = (inputQtd.value * inputValor.value).toLocaleString(
        "pt-BR",
        { minimumFractionDigits: 2 }
    );

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("btn", "btn-danger", "btn-sm");
    botaoExcluir.innerText = "Excluir";

    tdExcluir.append(botaoExcluir);

    tr.append(tdNome);
    tr.append(tdQtd);
    tr.append(tdCategoria);
    tr.append(tdValor);
    tr.append(tdTotal);
    tr.append(tdExcluir);

    tbody.append(tr);
    // para aparecer o card de pedidos quando for adicionado algum pedido.
    cardPedido.classList.remove("d-none");
    botaoFinalizar.classList.remove("d-none");

    botaoExcluir.addEventListener("click", () => {
        tr.remove();
        if (tbody.childNodes.length == 0) {
            cardPedido.classList.add("d-none");
            botaoFinalizar.classList.add("d-none");
            alertaTotal.classList.add("d-none");
        }
        let valorTemporario = tdTotal.innerHTML;
        valorRetirado += parseFloat(valorTemporario.replace(".", ""));
    });

    // função para criar pop-up de confirmação
    const alertaSucesso = document.querySelector("#alertaSucesso");
    alertaSucesso.classList.remove("d-none");

    function exibirDiv() {
        alertaSucesso.classList.add("d-none");
    }
    setTimeout(exibirDiv, 3000);

    valordeProdutos += inputQtd.value * inputValor.value;

    //console.log(valordeProdutos);
    //console.log(valorRetirado);

    inputNome.value = "";
    inputQtd.value = 1;
    inputValor.value = 1;
});

//função para mostrar o valor total
const alertaTotal = document.querySelector("#alertaTotal");
const saidaFinalizacao = document.querySelector("#saidaFinalizacao");
const totalH4 = document.querySelector("#totalH4");
botaoFinalizar.addEventListener("click", () => {
    alertaTotal.classList.remove("d-none");
    let valordoPedido = valordeProdutos - valorRetirado;
    totalH4.innerHTML =
        "O valor total é: R$" +
        valordoPedido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
        });
});

// função para o botão de remover todos os pedidos.
const removerAll = document.querySelector("#btnRemoverAll");
removerAll.addEventListener("click", () => {
    const trs = document.querySelectorAll("tbody tr");
    trs.forEach((item) => {
        item.remove();
    });
    cardPedido.classList.add("d-none");
    botaoFinalizar.classList.add("d-none");
    alertaTotal.classList.add("d-none");
});
