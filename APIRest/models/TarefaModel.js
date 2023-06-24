class TarefaModel {
    constructor() {
      this.tarefas = [];
    }
  
    listar() {
      return this.tarefas;
    }
  
    inserir(tarefa) {
      this.tarefas.push(tarefa);
    }
  
    buscarPorId(id) {
      return this.tarefas.find((tarefa) => tarefa.id === id);
    }
  
    atualizar(id, tarefaAtualizada) {
      const index = this.tarefas.findIndex((tarefa) => tarefa.id === id);
      if (index !== -1) {
        this.tarefas[index] = tarefaAtualizada;
        return true;
      }
      return false;
    }
  
    excluir(id) {
      const index = this.tarefas.findIndex((tarefa) => tarefa.id === id);
      if (index !== -1) {
        this.tarefas.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  module.exports = TarefaModel;