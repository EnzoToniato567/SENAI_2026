function reajustar() {
    let preco = Number(document.getElementById('preco').value);
    let resultado = document.getElementById('resultado');
    let desconto = 0;

    if (preco > 200) {
        desconto = preco * 5 / 100;
    }

    let precoComDesconto = preco - desconto;

    resultado.innerHTML = `
    Desconto de R$ ${desconto.toFixed(2)} <br>
    Preço final de R$ ${precoComDesconto.toFixed(2)}
    `;
}