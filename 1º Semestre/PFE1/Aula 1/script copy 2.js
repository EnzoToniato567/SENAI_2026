function reajustar() {
    let preco = Number(document.getElementById('preco').value);
    let resultado = document.getElementById('resultado');
    let frete = 0;

    if (preco >= 150) {
        frete = 0;
    } else if (preco < 150) {
        frete = 20;
    }
 
    let precoComFrete = preco + frete;

    resultado.innerHTML = `
    Frete de R$ ${frete.toFixed(2)} <br>
    Preço final de R$ ${precoComFrete.toFixed(2)}
    `;
}