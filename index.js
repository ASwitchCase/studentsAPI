const express = require('express')
const app = express()
var cors = require('cors');
const mongo = require('./services/data_access.js')

app.use(cors())

app.get('/api/users', async (req,res) =>{
    const data = await mongo.load_data()
    res.send(data)
})

app.listen(3001,()=>console.log("listening..."))