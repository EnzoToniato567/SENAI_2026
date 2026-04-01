const modalReceita = document.getElementById("modalReceita");
const cadReceita = document.getElementById("cadReceita");
const dados = document.getElementById("dados");

let indiceEditar = null;
let receitas = JSON.parse(localStorage.getItem("receitas")) || [];

renderizarReceitas();

function salvarDadosLocalmente() {
    localStorage.setItem("receitas", JSON.stringify(receitas));
}

function abrirModal() {
    modalReceita.style.display = "block";
}

function fecharModal() {
    modalReceita.style.display = "none";
    cadReceita.reset();
    indiceEditar = null;
}

function editarModal(indice) {
    const receita = receitas[indice];

    cadReceita.nome.value = receita.nome;
    cadReceita.tipo.value = receita.tipo;
    cadReceita.ingredientes.value = receita.ingredientes;
    cadReceita.preparo.value = receita.preparo;
    cadReceita.img.value = receita.img;
    cadReceita.custo.value = receita.custo;

    indiceEditar = indice;
    abrirModal();
}

cadReceita.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const receita = {
        nome: cadReceita.nome.value,
        tipo: cadReceita.tipo.value,
        ingredientes: cadReceita.ingredientes.value,
        preparo: cadReceita.preparo.value,
        img: cadReceita.img.value,
        custo: parseFloat(cadReceita.custo.value)
    };

    if (indiceEditar !== null) {
        receitas[indiceEditar] = receita;
    } else {
        receitas.push(receita);
    }

    salvarDadosLocalmente();
    renderizarReceitas();
    fecharModal();
});

function criarCard(receita, indice) {
    return `
        <div class="card">
            ${receita.img ? `<img src="${receita.img}" alt="${receita.nome}">` : `<div class="sem-foto">Sem imagem</div>`}
            <h3>${receita.nome}</h3>
            <p><strong>Tipo:</strong> ${receita.tipo}</p>
            <p><strong>Ingredientes:</strong> ${receita.ingredientes}</p>
            <p><strong>Preparo:</strong> ${receita.preparo}</p>
            <p><strong>Custo:</strong> R$ ${receita.custo.toFixed(2)}</p>
            <div class="botoes">
                <button type="button" class="editar" onclick="editarModal(${indice})">Editar</button>
                <button type="button" class="excluir" onclick="excluirReceita(${indice})">Excluir</button>
            </div>
        </div>
    `;
}

function renderizarReceitas() {
    dados.innerHTML = "";

    if (receitas.length === 0) {
        dados.innerHTML = "<p>Nenhuma receita cadastrada.</p>";
        return;
    }

    receitas.forEach(function (receita, indice) {
        dados.innerHTML += criarCard(receita, indice);
    });
}

function excluirReceita(indice) {
    if (confirm("Tem certeza que deseja excluir esta receita?")) {
        receitas.splice(indice, 1);
        salvarDadosLocalmente();
        renderizarReceitas();
    };
}