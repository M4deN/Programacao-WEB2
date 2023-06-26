import taskService from "./taskservice.js"

let atualizaTarefas = async function() {
    let resp = await taskService.lista()
    if (resp.status) {
        let ul =  document.querySelector("#tarefas");
        ul.innerHTML = "";
        resp.list.forEach((item) => {
            let li = document.createElement("li")
                        
            let edit = document.createElement("button")
            edit.addEventListener("click", function() {
                document.querySelector("#tid").value = item.id
                document.querySelector("#tnome").value = item.name
            })
            edit.className = "btn btn-link"
            edit.innerHTML = "edit"
                        
            let del = document.createElement("button")
            del.innerHTML = "done"
            del.className = "btn btn-link"
            del.addEventListener("click", async function() {
                if (confirm("Deseja finalizar a tarefa?")) {
                    let resp = await taskService.exclui(item.id, getToken())
                    if (resp.status) {
                        ul.removeChild(li);
                    } else {
                        setToken('');
                        refresh();
                        document.querySelector("#erro").innerHTML = resp.msg;
                    }
                }
            })

            if (!isAuthenticated()) {
                edit.className += ' d-none'
                del.className += ' d-none'
            }

            li.appendChild(document.createTextNode(item.name + " "))
            li.appendChild(edit)
            li.appendChild(del)
            ul.appendChild(li)
        })
    }
}

let refresh = function() {
    atualizaTarefas()
    if (!isAuthenticated()) {
        document.querySelector("form#ftarefa").className = 'd-none';
        document.querySelector("form#flogin").className = '';
    } else {
        document.querySelector("form#flogin").className = 'd-none';
        document.querySelector("form#ftarefa").className = '';
    }

    document.querySelector("#tid").value = '';
    document.querySelector("#tnome").value = '';
    document.querySelector("#tusuario").value = '';
    document.querySelector("#tsenha").value = '';
    document.querySelector('#msglogin').innerHTML = '';
    document.querySelector("#erro").innerHTML = '';
}

window.addEventListener("load", async function() {
    refresh();

    document.querySelector("form#ftarefa").addEventListener("submit", async function(evt) {
        evt.preventDefault();
        let hid = document.querySelector("#tid")
        let hnome = document.querySelector("#tnome")
        let resp;
        if (hid.value) {
            resp = await taskService.altera(hid.value, hnome.value, getToken());
        } else {
            resp = await taskService.novo(hnome.value, getToken());
        }
        if (resp.status) {
            atualizaTarefas()
            hid.value = '';
            hnome.value = '';
        } else {
            setToken('');
            refresh();
            document.querySelector("#erro").innerHTML = resp.msg;
        }
    })

    document.querySelector("form#flogin").addEventListener("submit", async function(evt) {
        evt.preventDefault();

        let user = document.querySelector("#tusuario").value;
        let pass = document.querySelector("#tsenha").value;

        let result = await taskService.login(user, pass)
        if (result.status) {
            setToken(result.token);
            refresh();
        } else {
            document.querySelector('#msglogin').innerHTML = 'Login invalido';
        }
    })

    document.querySelector('#deslogar').addEventListener('click', () => {
        setToken('');
        refresh();
    })
})

const setToken = function(token) {
    sessionStorage.setItem('token', token);
}

const getToken = function () {
    return sessionStorage.getItem('token')
}

const isAuthenticated = function () {
    if (getToken()) {
        return true;
    }
    return false;
}