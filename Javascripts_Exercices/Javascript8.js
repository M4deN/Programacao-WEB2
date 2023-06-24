class TreeNode {
    constructor(value) {
      this.value = value;
      this.children = [];
    }
  
    addChild(node) {
      this.children.push(node);
    }
  }
  
  class Tree {
    constructor(root) {
      this.root = root;
    }
  
    traverse(node, callback) {
      callback(node);
  
      for (let child of node.children) {
        this.traverse(child, callback);
      }
    }
  }
  
  // Criando a estrutura de árvore
  const home = new TreeNode('Home');
  const about = new TreeNode('About');
  const contact = new TreeNode('Contact');
  const products = new TreeNode('Products');
  const product1 = new TreeNode('Product 1');
  const product2 = new TreeNode('Product 2');
  const product3 = new TreeNode('Product 3');
  
  home.addChild(about);
  home.addChild(contact);
  home.addChild(products);
  products.addChild(product1);
  products.addChild(product2);
  products.addChild(product3);
  
  const tree = new Tree(home);
  
  // Exibindo a estrutura da árvore na página
  const rootElement = document.createElement('ul');
  
  tree.traverse(tree.root, (node) => {
    const element = document.createElement('li');
    const text = document.createTextNode(node.value);
    element.appendChild(text);
  
    if (node === tree.root) {
      rootElement.appendChild(element);
    } else {
      const parentElement = rootElement.querySelector(`li:contains(${node.parent.value})`);
      const list = parentElement.querySelector('ul') || document.createElement('ul');
      list.appendChild(element);
      parentElement.appendChild(list);
    }
  });
  
  document.body.appendChild(rootElement);