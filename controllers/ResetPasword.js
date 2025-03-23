const mysql=require('../models/db.js');
const bcrypt=require('bcrypt');

const ResetPasword=(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password) return res.status(400).json({sucess:false,message:'Enter email & password'});

    const selectQuery=`CALL FindUser(?)`;
    mysql.query(selectQuery,[email],(err1,user)=>{
      if(err1) return res.status(500).json({success:false,message:'Somthing failede',err:err1});

      if(user[0].length==0) return res.status(400).json({success:false,message:'User not exists'});

      const hashnewpassword=bcrypt.hashSync(password,10);

      const updatePasswordQuery=`CALL ResetPasword(?,?)`;
      mysql.query(updatePasswordQuery,[email,hashnewpassword],(err2,updateuser)=>{
        if(err2) return res.status(500).json({success : false,message:'Something went wrong',error:err2});
        else{
          return res.status(200).json({
            success:true,
            message:'Password has been succesfully changed'
          })
        }
      })
    })
  }
  module.exports=ResetPasword;