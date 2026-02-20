function reajustar() {
    let mensalidade = Number(document.getElementById('mensalidade').value);
    let diasAtraso = Number(document.getElementById('diasAtraso').value);
    let resultado = document.getElementById('resultado');
    let multa = 0;

    if (diasAtraso > 0) {
        multa = mensalidade * 2 / 100;
    }

    let totalPagar = mensalidade + multa;

    resultado.innerHTML = `
    Valor da multa: R$ ${multa.toFixed(2)} <br>
    Valor total a pagar: R$ ${totalPagar.toFixed(2)}
    `;
}