const mysql=require('mysql');

const mysqlconnection=mysql.createConnection({
    host : 'localhost',
    user:'root',
    password:'Shiv@3923',
    database : '23march_loginsignup_api'
})

module.exports=mysqlconnection;