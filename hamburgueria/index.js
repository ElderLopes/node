const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())



const checkIdOrder = (request, response, next) => {
    const  orderId = request.params.id
    const orderIndex = orders.findIndex(order => order.id === orderId)

    if (orderIndex < 0) {
        return response.status(404).json({ error: 'Order Not Found 😪' })
    }

    request.orderIndex = orderIndex
    request.orderId = orderId
    next()
}
const orders = []

app.post('/order', (request, response) => {

    const { order, clientName, price } = request.body
    const orderId = uuid.v4()
    const newOrder = {
        id: orderId,
        order,
        clientName,
        price,
        status: 'Em Preparação',
    }
    orders.push(newOrder)
    return response.json(newOrder)
})

app.get('/order', (request, response) => {
    return response.json(orders)
})

app.put('/order/:id', checkIdOrder, (request, response) => {

    const { order, clientName, price} = request.body
    const orderIndex = request.orderIndex

    const updateOrder = { id:request.orderId, order, clientName, price, }
    if (orderIndex < 0) {
        return response.status(404).json({ message: "User Not Founs😥😥" })//caso nao encontre tem esse if de ero
    }
    orders[orderIndex] = updateOrder

    return response.json(updateOrder);
});

app.delete('/order/:id',checkIdOrder, (request, response) => {
    const orderIndex = request.orderIndex
    if (orderIndex < 0) {
        return response.status(404).json({ message: "User Not Founs" })//caso nao encontre tem esse if de ero
    }

    orders.splice(orderIndex, 1)

    return response.status(204).json(orders)
})

app.get('/order/:id',checkIdOrder, (request, response) => {
    const orderId = request.orderId
    const order = orders.find(order => order.id === orderId)
    
    
  
    return response.json(order);
  });

  
app.patch('/order/:id', checkIdOrder, (request, response) => {
    const orderIndex = request.orderIndex;
    const orderToUpdate = orders[orderIndex];
  
    orderToUpdate.status = 'Pronto';
  
    return response.json(orderToUpdate);
})

app.listen(port, () => {


    console.log(`🚀😎 Server started on port ${port} 🚀😎`)
})