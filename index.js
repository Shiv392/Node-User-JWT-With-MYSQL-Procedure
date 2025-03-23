const express=require('express');
const app=express();
const mysqlconnection=require('./models/db.js');
const UserRoute = require('./routes/index.js');
const TokenAuth= require('./middleware/TokenAuth.js');
const port = 8000;
const cors=require('cors');
const bodyparser=require('body-parser');

app.use(cors());
app.use(bodyparser.json());

app.use(UserRoute);

app.use(TokenAuth)
app.get('/',(req,res)=>{
    return res.status(200).send(`<h1>Home Page</h1>`);
})

mysqlconnection.connect((err)=>{
    if(err){
        console.log('error occured while connecting to database',err);
    }
    else{
        console.log('connection established');
    }
})



app.listen(port,()=>{
    console.log(`server listening on port http://localhost:${port}`);
})

