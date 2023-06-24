const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
descricao: {
type: String,
required: true
},
concluida: {
type: Boolean,
default: false
}
});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);

class TarefaModel {
async listar() {
const tarefas = await Tarefa.find({});
return tarefas;
}

async inserir(tarefa) {
const novaTarefa = new Tarefa(tarefa);
await novaTarefa.save();
return novaTarefa;
}

async buscarPorId(id) {
const tarefa = await Tarefa.findById(id);
return tarefa;
}

async atualizar(id, tarefaAtualizada) {
const tarefa = await Tarefa.findByIdAndUpdate(id, tarefaAtualizada, { new: true });
if (tarefa) {
return true;
}
return false;
}

async excluir(id) {
const tarefa = await Tarefa.findByIdAndDelete(id);
if (tarefa) {
return true;
}
return false;
}
}

module.exports = TarefaModel;