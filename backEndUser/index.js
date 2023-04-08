
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')
const app = express()
const port = 3001
app.use(express.json());
app.use(cors());




const checkIdUser = (request, response, next) => {
    const  userId = request.params.id
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex < 0) {
        return response.status(404).json({ error: 'User Not Found 😪' })
    }

    request.userIndex = userIndex
    request.userId = userId
    next()
}
const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})


app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = {id: uuid.v4(), name,age}
    users.push(user)
    return response.json(user)
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age} = request.body

    const updateUser = {id, name, age}

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User Not Found 😥😥" })//caso nao encontre tem esse if de ero
    }
    users[index] = updateUser

    return response.json(updateUser);
});

app.delete('/users/:id',(request, response) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id ===id)
    if (index < 0) {
        return response.status(404).json({ message: "User Not Found" })//caso nao encontre tem esse if de ero
    }

    users.splice(index, 1)

    return response.status(204).json()
})


app.listen(port, () => {


    console.log(`🚀😎 Server started on port ${port} 🚀😎`)
})