

//Querry params => meusite.com/users?name=elder&age=38...// qerry parms é muito usado em filtros e paginação
//route params => /users/2      //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
// request body => {name: "Elder", age"38"}

//GET - BUSCA INFORMAÇÃO BACK END
//POST - CRIA INFORMAÇÃO NO BACK END
//PUT/PATCH - ALTERA/ATUALIZA A INFORMAÇÃO NO BACK END
//DELETE - DELETA INFORMAÇÃO NO BACK END
//middlewares => ele é um interceptador - tem o poder de alterar ou parar os dados

// app.get('/users',(request, response)=>{
//     //const {name, age} = request.query  //criando const

//     console.log(request.body)

//     return response.json ({message: "OK"})// return response.json ({name:name, age})//quando o nome da variavel é o mesmo do valor pode deixar como esta o age
// })

// app.listen(port, () =>{

//     console.log(`🚀😎 Server started on port ${port} 🚀😎`)
// })

const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())
const users = [] // nunca se usa const isso so para didatica
const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)//estamos encontrando o usario
    if (index < 0) {
        return response.status(404).json({ message: "User Not Founs" })//caso nao encontre tem esse if de ero
    }
    request.userIndex = index
    request.userId = id
    next()
}
app.get('/users', (request, response) => {
    return response.json(users)
})


app.post('/users', (request, response) => {//criando informação id

    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }//uuid é uma blbioteca do npm
    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', checkUserId, (request, response) => {//alterar dados

    const { name, age } = request.body//no body pegamos os usuarios
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }//1 passo é criar o usaario id fixo


    if (index < 0) {
        return response.status(404).json({ message: "User Not Founs" })//caso nao encontre tem esse if de ero
    }

    users[index] = updateUser
    return response.json(updateUser)
})
app.delete('/users/:id',checkUserId, (request, response) => {//deletar dados
    const index = request.userIndex
    if (index < 0) {
        return response.status(404).json({ message: "User Not Founs" })//caso nao encontre tem esse if de ero
    }

    users.splice(index, 1)

    return response.status(204).json(users)
})

app.listen(port, () => {

    console.log(`🚀😎 Server started on port ${port} 🚀😎`)
})
