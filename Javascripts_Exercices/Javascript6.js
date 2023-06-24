function contarCaractere(texto, caractere) {
    let contador = 0;
    for (let i = 0; i < texto.length; i++) {
      if (texto[i] === caractere) {
        contador++;
      }
    }
    return contador;
  }