var express = require("express")
var app = express()
var cors = require('cors');
let projectcollection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//mongodb connection...
const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb+srv://vinithmongo:vinith@cluster0.zalljvf.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(url);


const createCollection = (collectionName) => {
client.connect((err,db) => {
projectcollection = client.db().collection(collectionName);
if(!err){
console.log('Mongodb connected')
}
else{
    console.log("DB Error: ", err);
    process.exit(1);
}
})
}
//insert project...
const insertProjects = (project,callback) => {
    projectcollection.insert(project,callback);
}
//post api...
app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;

    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Project Successfully added", data: result})
        }
    })
})
const cardList = [
    {
        title: "Kitten 2",
        image: "../images/kitten-1.jpg",
        link: "About Kitten 2",
        desciption: "Demo desciption about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "../images/kitten-2.jpg",
        link: "About Kitten 3",
        desciption: "Demo desciption about kitten 3"
    }
]

//get project...​

const getProjects = (callback) => {
    projectcollection.find({}).toArray(callback);
}

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

var port = process.env.port || 3000;


app.listen(port,()=>{
    console.log("App listening to: http://localhost:"+port)
    createCollection('pets')

})
