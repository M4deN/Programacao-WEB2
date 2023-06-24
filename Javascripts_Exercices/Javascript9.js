class Produto {
    static #listaProdutos = []; // lista estática e privada de produtos
    #id;
    #nome;
    #imagem;
    #preco;
  
    constructor(nome, preco, imagem = 'default.png') {
      this.#id = Produto.#listaProdutos.length + 1; // gera id automaticamente
      this.#nome = nome;
      this.#preco = preco;
      this.#imagem = imagem;
      Produto.#listaProdutos.push(this); // adiciona o produto à lista de produtos
    }
  
    // getters
    get id() {
      return this.#id;
    }
  
    get nome() {
      return this.#nome;
    }
  
    get imagem() {
      return this.#imagem;
    }
  
    get preco() {
      return this.#preco;
    }
  
    // método estático para buscar um produto por ID
    static buscarPorId(id) {
      return Produto.#listaProdutos.find(produto => produto.id === id);
    }
  }

  // cria produtos
const produto1 = new Produto('Camiseta', 29.99, 'camiseta.jpg');
const produto2 = new Produto('Calça', 59.99);
const produto3 = new Produto('Tênis', 99.99, 'tenis.jpg');

// busca produto por ID
const produtoEncontrado = Produto.buscarPorId(2);
console.log(produtoEncontrado); // Produto { #id: 2, #nome: 'Calça', #imagem: 'default.png', #preco: 59.99 }
