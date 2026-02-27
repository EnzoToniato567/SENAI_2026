void main() {
  // Variáveis
  int numero = 4;
  String texto = "2";
  bool ativo = false;
  bool ativo2 = true;
  var naoTipada = 50;
  dynamic dinamica = "Oi"; // Variável que aceita tudo

  // Processamento
  numero = numero + numero;
  naoTipada = 50;
  dinamica = 20;

  // Saídas
  print("Concatenar 2" + texto + ", Soma = " + numero.toString());
  print("Usando tempalte string a soma de 2 + 2 é $numero");
  print(ativo ? "Oi" : "Tchau");
  print(ativo2 ? "Oi" : "Tchau");
  print("Não tipada = $naoTipada");
  print("Dinâmica = $dinamica");
}
