var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extends: false}))


//const addnumbers = (number1, number2) => {...
//})  

var port = process.env.port || 3000;


app.listen(port,()=>{
    console.log("App listening to: http://localhost:"+port)

})
