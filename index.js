const fs = require('fs');
const http = require('http');
const url = require('url');
const dotenv = require('dotenv');
const mongodb = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser')

dotenv.config({path:'./config.env'})
const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
//mongodb+srv://juaracoding:<password>@cluster0.fqgrm.mongodb.net/<dbname>?retryWrites=true&w=majority

mongodb.connect(DB,{
useNewUrlParser:true,
useCreateIndex:true,
useFindAndModify:true
}).then(connection =>{
console.log("Koneksi Berhasil")

})

const app = express();
const port = 3000;

const server = http.createServer((request,response) =>{
console.log("server ready")
const album = fs.readFileSync('./album.json','utf-8');
const user = fs.readFileSync('./user.json','utf-8');
const {query,pathname} = url.parse(request.url,true);

// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true })

app.get('/', (req, res) =>{

  res.status(404)
   .json({message:'Hello World',app:'Hello World'});

})

app.post('/api/post',urlencodedParser, (req, res) =>{
  console.log(req.body);
  res.status(200).json(req.body);
  
})



app.listen(port,() => {

console.log("Server Siyapp")
})

if(pathname === "/home" || pathname ==="/"){
    response.end(`<H1> Welcome, ${query.nama}  To API Dummy </H1>`);

}else if(pathname ==="/album"){
 
   response.writeHead(200,{'Content-Type': 'application/json'});
   response.end(album);

}else if(pathname ==="/user"){
    response.writeHead(200,{'Content-Type': 'application/json'});
    response.end(user);
 
 }else{
    response.writeHead(404, {'Content-Type': 'text/html','my-header': 'hello-world'});
    response.end("<h1>Tidak Ketemu</h1>");
}

})


server.listen(6969,'127.0.0.1',() =>{
  console.log("Server sedang mendengarkan port 6969")

});


