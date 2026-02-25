const modalCliente = document.getElementById("modalCliente");
var clientes = JSON.parse(localStorage.getItem("clientes")) || [];
renderizarTabela();

function salvarDadosLocalmente() {
    localStorage.setItem("clientes", JSON.stringify(clientes))
}

function abrirModal() {
    document.getElementById("modalCliente").style.display = "block";
}

function fecharModal() {
    const excluirCampos = document.getElementById("modalCliente");
    excluirCampos.style.display = "none";
    limparCampos();
}

const cadCli = document.getElementById("cadCli");
cadCli.addEventListener("submit", f => {

    f.preventDefault(); 

    const obj = {
        cpf: cadCli.cpf.value,
        nome: cadCli.nome.value,
        sobrenome: cadCli.sobrenome.value,
        nascimento: cadCli.nascimento.value
    }

    // Adicionar o objeto na lista de clientes
    clientes.push(obj);
    salvarDadosLocalmente(); // chamada adicionada
    renderizarTabela();
    fecharModal();
    cadCli.reset();

});

function renderizarTabela() {
    const dados = document.getElementById("dados");
    dados.innerHTML = ""; // Limpa todas as linhas da tabela

    // Percorrer a lista preenchendo a tabela novamente
    clientes.forEach((cliente, i) => {
        dados.innerHTML += `
        <tr>
            <td>${cliente.cpf}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.sobrenome}</td>
            <td>${cliente.nascimento}</td> 
            <td>
                <button onclick="excluirDados(${i})">Excluir</button>
            </td>
        </tr>
        `;
    });
}

function excluirDados(indice) {
    clientes.splice(indice, 1)
    salvarDadosLocalmente();
    renderizarTabela();
    window.location.reload();
}