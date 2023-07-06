const express = require('express')
const app = express()
app.use(express.json())
const {bookRouter} = require('./routes/book.routes')
const {connection} = require('./db')

app.get('/',(req,res) => {
    res.send("Home Page!!")
})

app.use('/books',bookRouter)

app.listen(9090, async ()=>{
    try{
     await connection
    console.log('connected to the database')
    }
    catch(err){
        console.log(err)
    }
    console.log('Running at 9090')
})

