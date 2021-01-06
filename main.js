const dotenv = require('dotenv');
const mongodb = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const { urlencoded } = require('express');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

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

const MovieDB = new mongodb.Schema({
    judul : {
        type : String,
        require : [true, "Masukkan judul film"],
        unique : true
    }, rating : {
        type : Number,
        default : 3,
    }, sinopsis : {
        type : String
    }
});

const Movie = mongodb.model('movie', MovieDB);
// const testInsert = new Movie({
//     judul : '1 menit',
//     rating : 7,
//     sinopsis : 'trailer'
// })

// testInsert.save();

const app = express();
const port = 3000;

const jsonParser = bodyParser.json(Movie);

app.get('/', (req,res) => {
    res.status({message : 'hello world', app:'hello world'});

})

app.post('/movie/add', urlencodedParser, (req,res) => {
    let {judul, rating, sinopsis} = req.body;

    let addMovie = new Movie({
        judul : judul,
        rating : rating,
        sinopsis : sinopsis
    })

    addMovie.save().then (doc => {
        res.status(200).json("berhasil input data" + doc);
    }).catch(err => {
        res.status(500).send("gagal insert data" + err)
    })
})

app.get('/movie/get', async(req,res) => {
    let dataHasil = await Movie.find();
    res.status(200).json(dataHasil);
    console.log(Movie.find());
})

app.listen(port,() => {

    console.log("Server Siyapp")
    })