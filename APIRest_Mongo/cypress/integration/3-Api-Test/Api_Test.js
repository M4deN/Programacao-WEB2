/// <reference types="cypress" />

describe('eExemplo Testes APIREST', () => {
   
    it('Teste Error 404 Not Found', () => {
        cy.request({
            method:'GET',
            url: 'http://localhost:3000/tarefas/1',
            failOnStatusCode: false           
        }).should(({status, body})=>{
            expect(status).to.eq(404)
            expect(body).to.eq("Tarefa não encontrada")
        
        })
      })
    it('Teste Inserindo Registro na API POST', () => {
        cy.request("POST", "http://localhost:3000/tarefas", { descricao: "Linguagem de Programação", concluida: 'true' }).then(
            (response) => {
                //response.body é serializado automaticamente no JSON
                expect(response.body).to.have.property("descricao", "Linguagem de Programação", "concluida",'true') // true
            })
            
    })

    it('Verificando Item Adicionado GET', () => {
        cy.request({
            method:'GET',
            url: 'http://localhost:3000/tarefas/1'           
        }).should(({status, body})=>{
            const{id,descricao,concluida} = body
            expect(status).to.eq(200)
            expect(id).to.eq(1)
            expect(descricao).to.eq("Linguagem de Programação")
            expect(concluida).to.eq("true")
        })
      })
      
      it('Teste Ataulizando Registro 1 Da API PUT', () => {
        cy.request("PUT", "http://localhost:3000/tarefas/1", { descricao: "Programação Web 2", concluida: 'False' }).then(
            (response) => {
                //response.body é serializado automaticamente no JSON
                expect(response.body).to.have.property("descricao", "Programação Web 2", "concluida",'False') // true
            })
            
    })

      it('Teste Deletando Registro DELETE', () => {
        cy.request({
            method:'DELETE',
            url: 'http://localhost:3000/tarefas/1'           
        }).should(({status, body})=>{
            const{} = body
            expect(status).to.eq(200)
            expect(body).to.eq("Tarefa excluída com sucesso")
        })
      })
})
