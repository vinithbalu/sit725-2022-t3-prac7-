var express = require("express")

var app = express()

const addnumbers = (number1, number2) => {
    var num1 = parseInt(number1)
    var num2 = parseInt(number2)
    var res = num1+num2;
    return res

}

app.get("/addtwonumbers", (req,res) => {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var result = addnumbers(number1, number2)
    res.json({statuscode: 200, data: result, message: 'success'})
})

var port = process.env.port || 3000


app.listen(port,()=>{
    console.log("App listening to: http://localhost:"+port)

})
