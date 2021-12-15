const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const customers = []

app.post('/account', (request, response) => {
    const { cpf, name } = request.body
    const accountAlreadyExist = customers.some(customer => customer.cpf === cpf)
    if(accountAlreadyExist) {
        return response.status(400).json({ error: "Customer already exists!" })
    } 
  
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })

    return response.status(201).send()     
})

app.listen(3333, () => {
    console.log("Servidor Online na porta 3333!")
})
