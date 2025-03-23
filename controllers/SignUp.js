const mysql=require('../models/db.js');
const bcrypt=require('bcrypt');

const SignUp=(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({success:false,message:'Enter Credential'});
    }

    const sql = `CALL FindUser(?)`; // Stored procedure call

    mysql.query(sql,[email],(err,result)=>{
        if(err){
            return res.status(502).json(({success:false,message:'Something went wrong',error:err}))
        }
        console.log('user result---------->',result[0]);
        if(result[0].length>0){
            //user already exists ----------------->
            return res.status(400).json({success:false,messsage:'User already exists'});
        }
        else{
            //store new user 
            //first encrypt password
            const hashedPassword=bcrypt.hashSync(password,10);
            const addusersql=`call UserSignUp(?,?,?)`; //using stored procedure to call user sign up
            mysql.query(addusersql,[name,email,hashedPassword],(err2,addres)=>{
                if(err2){
                    return res.status(502).json({success:false,message:'Something went wrong',error:err2})
                }
                return res.status(201).json({success:true,message:'New User has been added'});
            })
        }
    })
}
  module.exports=SignUp;