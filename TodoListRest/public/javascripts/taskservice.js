let taskService = {
    lista: async function() {
        const response = await fetch('http://localhost:3000/api/tasks')
        return await response.json()
    },
    busca: async function(id) {
        const response = await fetch('http://localhost:3000/api/tasks/' + id)
        return await response.json()
    },
    novo: async function(nome, token) {
        const data = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nome: nome})
        }
        const response = await fetch('http://localhost:3000/api/tasks?token=' + token, data)
        return await response.json()
    },
    altera: async function(id, nome, token) {
        const data = {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({nome: nome})
        }
        const response = await fetch('http://localhost:3000/api/tasks/'+id+'?token='+token, data)
        return await response.json()
    },
    exclui: async function(id, token) {
        const response = await fetch('http://localhost:3000/api/tasks/'+id+'?token=' + token, {method: 'DELETE'})
        return await response.json()
    },
    login: async function (user, senha) {
        const data = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({usuario: user, senha: senha})
        }
        const response = await fetch('http://localhost:3000/api/login', data)
        return await response.json()
    }
}

export default taskService