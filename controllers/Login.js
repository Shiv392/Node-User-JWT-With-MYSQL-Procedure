const mysql=require('../models/db.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const Login=(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password) return res.status(402).json({success:false,message:'Invalid email or password'});
  const findEmailQuery=`CALL FindUser(?)`;

  mysql.query(findEmailQuery,[email],(err1,user)=>{
    if(err1) return res.status(500).json({success:false,message:'Something went wrong',error:err1});
    if(user[0].length==0) return res.status(404).json({success:false,message:'User not found'});

    const userobj=user[0][0];
    console.log('userobject--------->',userobj);
    const hashuserpassword=userobj.password;
    bcrypt.compare(password,hashuserpassword,(err2,matcheduser)=>{
        if(err2) return res.status(502).json({success:false,message:'something went wrong',error:err2});
        if(!matcheduser) return res.status(404).json({success:false,message:'Password not match'});
        else{
          //create jwt key here --------->
          const token=jwt.sign({userid:userobj.id,useremail:userobj.email},'Shiv@3923',{expiresIn:'24hr'});
          return res.status(200).json(
            {
            success:true,
            message:'Login Successfull',
            usertoken:token
          }
          );
        } 
        
    })
  })
}
module.exports=Login;