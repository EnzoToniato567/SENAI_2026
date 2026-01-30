function reajustar() {
    let conta = Number(document.getElementById('taxa').value);
    let resultado = document.getElementById('resultado');
    let taxaServico = 0;

    if (conta > 100) {
        taxaServico = conta * 10 / 100;
    }

    let total = conta + taxaServico;

    resultado.innerHTML = `
    Taxa de serviço: R$ ${taxaServico.toFixed(2)} <br>
    Total da conta: R$ ${total.toFixed(2)}
    `;
}