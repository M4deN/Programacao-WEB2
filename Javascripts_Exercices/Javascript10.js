class CarrinhoDeCompras {
    constructor() {
      this.produtos = [];
      this.total = 0;
    }
  
    incluir(produto, quantidade) {
      // verifica se o produto já existe no carrinho
      const index = this.produtos.findIndex(p => p.id === produto.id);
  
      if (index !== -1) {
        // se o produto já existe, apenas atualiza a quantidade
        this.produtos[index].quantidade += quantidade;
        this.produtos[index].subtotal = this.produtos[index].quantidade * this.produtos[index].preco;
      } else {
        // se o produto não existe, adiciona um novo produto ao carrinho
        const novoProduto = {
          id: produto.id,
          nome: produto.nome,
          imagem: produto.imagem,
          preco: produto.preco,
          quantidade: quantidade,
          subtotal: produto.preco * quantidade
        };
  
        this.produtos.push(novoProduto);
      }
  
      this.total += produto.preco * quantidade;
    }
  
    excluir(produto) {
      // procura o produto no carrinho
      const index = this.produtos.findIndex(p => p.id === produto.id);
  
      if (index !== -1) {
        const produtoRemovido = this.produtos.splice(index, 1)[0];
        this.total -= produtoRemovido.subtotal;
      }
    }
  
    aumentarQuantidade(produto, quantidade) {
      // procura o produto no carrinho
      const index = this.produtos.findIndex(p => p.id === produto.id);
  
      if (index !== -1) {
        this.produtos[index].quantidade += quantidade;
        this.produtos[index].subtotal = this.produtos[index].quantidade * this.produtos[index].preco;
        this.total += produto.preco * quantidade;
      }
    }
  
    diminuirQuantidade(produto, quantidade) {
      // procura o produto no carrinho
      const index = this.produtos.findIndex(p => p.id === produto.id);
  
      if (index !== -1) {
        if (this.produtos[index].quantidade - quantidade <= 0) {
          // se a quantidade ficar zero, remove o produto do carrinho
          const produtoRemovido = this.produtos.splice(index, 1)[0];
          this.total -= produtoRemovido.subtotal;
        } else {
          this.produtos[index].quantidade -= quantidade;
          this.produtos[index].subtotal = this.produtos[index].quantidade * this.produtos[index].preco;
          this.total -= produto.preco * quantidade;
        }
      }
    }
  
    // método para buscar um produto pelo ID
    buscarPorId(id) {
      return this.produtos.find(p => p.id === id);
    }
  }


  // cria instâncias da classe Produto
const produto1 = new Produto(1, 'Produto 1', 'https://www.example.com/produto1.jpg', 10);
const produto2 = new Produto(2, 'Produto 2', 'https://www.example.com/produto2.jpg', 20);
const produto3 = new Produto(3, 'Produto 3', 'https://www.example.com/produto3.jpg', 30);

// cria uma instância da classe CarrinhoDeCompras
const carrinho = new CarrinhoDeCompras();

// adiciona os produtos ao carrinho com diferentes quantidades
carrinho.incluir(produto1, 2);
carrinho.incluir(produto2, 1);
carrinho.incluir(produto3, 3);

// verifica se os produtos foram adicionados corretamente
console.log(carrinho.produtos); // [{ id: 1, nome: 'Produto 1', imagem: 'https://www.example.com/produto1.jpg', preco: 10, quantidade: 2, subtotal: 20 }, { id: 2, nome: 'Produto 2', imagem: 'https://www.example.com/produto2.jpg', preco: 20, quantidade: 1, subtotal: 20 }, { id: 3, nome: 'Produto 3', imagem: 'https://www.example.com/produto3.jpg', preco: 30, quantidade: 3, subtotal: 90 }]

// verifica o valor total da compra
console.log(carrinho.total); // 130

// testa o método de excluir um produto
carrinho.excluir(produto2);
console.log(carrinho.produtos); // [{ id: 1, nome: 'Produto 1', imagem: 'https://www.example.com/produto1.jpg', preco: 10, quantidade: 2, subtotal: 20 }, { id: 3, nome: 'Produto 3', imagem: 'https://www.example.com/produto3.jpg', preco: 30, quantidade: 3, subtotal: 90 }]
console.log(carrinho.total); // 110

// testa o método de aumentar a quantidade de um produto
carrinho.aumentarQuantidade(produto1, 3);
console.log(carrinho.produtos); // [{ id: 1, nome: 'Produto 1', imagem: 'https://www.example.com/produto1.jpg', preco: 10, quantidade: 5, subtotal: 50 }, { id: 3, nome: 'Produto 3', imagem: 'https://www.example.com/produto3.jpg', preco: 30, quantidade: 3, subtotal: 90 }]
console.log(carrinho.total); // 140

// testa o método de diminuir a quantidade de um produto
carrinho.diminuirQuantidade(produto1, 2);
console.log(carrinho.produtos); // [{ id: 1, nome: 'Produto 1', imagem: 'https://www.example.com/produto1.jpg', preco: 10, quantidade: 3, subtotal: 30 }, { id: 3, nome: 'Produto 3', imagem: 'https://www
