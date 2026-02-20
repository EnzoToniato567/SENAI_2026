function reajustar() {
    let preco = Number(document.getElementById('preco').value);
    let resultado = document.getElementById('resultado');
    let cashback = 0;

    if (preco > 300) {
        cashback = preco * 5 / 100;
    }

    let precoComCashback = preco + cashback;

    resultado.innerHTML = `
    Cashback de R$ ${cashback.toFixed(2)} <br>
    Preço final de R$ ${precoComCashback.toFixed(2)}
    `;
}