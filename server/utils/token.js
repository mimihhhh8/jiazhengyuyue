const jwt = require("jsonwebtoken");
//验证客户端传递到服务端的哪个token值是否正确
const secret = "1918";

//生成一个token
const sendToken = (tokenInfo)=>{
    return jwt.sign(tokenInfo,secret,{expiresIn:"3h"});
}


const tokenVerfiy = (req,res,next)=>{
    //获取token
    let token = req.cookies.token;

    //验证token
    jwt.verify(token,secret,(err,data)=>{
        if(data){
            next();
        }else{
            res.json({
                code:200,
                errMsg:"token验证失败",
                data:{
                    list:[],
                    status:0
                }
            })
        }
    })
}


module.exports = {
    sendToken,
    tokenVerfiy
}
