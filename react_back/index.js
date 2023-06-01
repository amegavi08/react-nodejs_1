const express = require('express')
const app = express()
const port = 3005

app.get('/', (req,res) => {

    res.send("Hello There")

})

app.get('/', (req,res) => {

    res.send("You're Welcome !")
    
})

app.listen(port, () =>{
    
    console.log("Request Successful")

})