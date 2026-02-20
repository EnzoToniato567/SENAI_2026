let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

document.addEventListener("DOMContentLoaded", renderizarTabela);

function abrirModal() {
    document.getElementById("modal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
    limparCampos();
}
