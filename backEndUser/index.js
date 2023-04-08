const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3001
app.use(express.json())



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

app.post('/user', (request, response) => {

    const { name, age } = request.body
    const userId = uuid.v4()
    const newUser = {
        id: userId,
        name,
        age,
    }
    users.push(newUser)
    return response.json(newUser)
})

app.get('/user', (request, response) => {
    return response.json(users)
})

app.put('/user/:id', checkIdUser, (request, response) => {

    const { name, age} = request.body
    const userIndex = request.userIndex

    const updateUser = { id:request.userId, name, age, }
    if (userIndex < 0) {
        return response.status(404).json({ message: "User Not Founs😥😥" })//caso nao encontre tem esse if de ero
    }
    users[userIndex] = updateUser

    return response.json(updateUser);
});

app.delete('/user/:id',checkIdUser, (request, response) => {
    const userIndex = request.userIndex
    if (userIndex < 0) {
        return response.status(404).json({ message: "User Not Founs" })//caso nao encontre tem esse if de ero
    }

    users.splice(userIndex, 1)

    return response.status(204).json(users)
})

app.get('/user/:id',checkIdUser, (request, response) => {
    const userId = request.userId
    const user = users.find(user => user.id === userId)
    
    
  
    return response.json(user);
  });

  
app.patch('/user/:id', checkIdUser, (request, response) => {
    const userIndex = request.userIndex;
    const userToUpdate = users[userIndex];
  
    userToUpdate.status = 'Pronto';
  
    return response.json(userToUpdate);
})

app.listen(port, () => {


    console.log(`🚀😎 Server started on port ${port} 🚀😎`)
})