const jwt=require('jsonwebtoken');

const TokenAuth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Please provide token'
        })
    }
    jwt.verify(token,'Shiv@3923',(tokenerr,ismatch)=>{
        if(tokenerr){
            return res.status(500).json({
                success:false,message:'Something went wrong',error:tokenerr
            })
        }
        else{
            if(ismatch){
                req.user=ismatch;
                next();
            }
            else{
                return res.status(404).json({
                    success:false,
                    message:'Invalid token'
                })
            }
        }
    })
}

module.exports=TokenAuth;