function reajustar() {
    let salario = Number(document.getElementById('salario').value);
    let resultado = document.getElementById('resultado');
    let bonus = 0;

    if (salario > 2000) {
        bonus = salario * 10 / 100;
    }

    let precoComBonus = salario - bonus;

    resultado.innerHTML = `
    Frete de R$ ${bonus.toFixed(2)} <br>
    Preço final de R$ ${precoComBonus.toFixed(2)}
    `;
}