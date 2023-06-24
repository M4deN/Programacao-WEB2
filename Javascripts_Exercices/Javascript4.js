function inverterNumero(numero) {
    let numeroInvertido = '';
    let numeroComoString = numero.toString();
    for (let i = numeroComoString.length - 1; i >= 0; i--) {
      numeroInvertido += numeroComoString[i];
    }
    return parseInt(numeroInvertido);
  }