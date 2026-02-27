// Nome
class Animal {
  // Atributos
  int id = 0;
  String nome = '';
  String especie = '';
  String raca = '';
  double peso = 0.0;

  // Métodos
  Animal(this.id, this.nome, this.especie, this.raca, this.peso);

  String tudoJunto() {
    return "$id, $nome, $especie, $raca, $peso";
  }
}

void main() {
  // Instâncias e Objetos
  Animal boi = Animal(1, "Bandido", "Bovino", "Nelori", 345.89);
  Animal vaca = Animal(2, "Mimosa", "Bovino", "Angus", 312.45);
  Animal cachorro = Animal(3, "Rex", "Canino", "Pastor Alemão", 45.3);
  Animal pato = Animal(4, "Quarapo", "Ave", "Pato Branco", 3.2);
  Animal lobo = Animal(5, "Alfa", "Canino", "Lobo Cinzento", 60.0);

  print(boi.tudoJunto());
  print(vaca.tudoJunto());
  print(cachorro.tudoJunto());
  print(pato.tudoJunto());
  print(lobo.tudoJunto());
}
