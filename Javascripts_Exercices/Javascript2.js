function calcular(valor1, valor2, operacao) {
    let resultado;
    switch (operacao) {
      case '+':
        resultado = valor1 + valor2;
        break;
      case '-':
        resultado = valor1 - valor2;
        break;
      case '*':
        resultado = valor1 * valor2;
        break;
      case '/':
        if (valor2 === 0) {
          resultado = "Divisão por 0 não é permitida";
        } else {
          resultado = valor1 / valor2;
        }
        break;
      default:
        resultado = "Operação inválida";
    }
    return resultado;
  }