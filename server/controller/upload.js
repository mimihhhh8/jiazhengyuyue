const cpUpload = require("../utils/upload")


const uploadImage=(req,res)=>{
    cpUpload(req,res,(err)=>{
        if(err){
            console.log("失败");
        }else{
            //images是服务server下的public里面的
            let urlPath="http://localhost:9000/images/"+req.files.file[0].filename;//服务器给的公共地址,file[0]是这个里面定义的 formData.append("file", imgFile);
            res.json({//服务器返回给用户的数据
                code:200,
                errMsg:"",
                data:{
                    urlImage:urlPath
                }
            })
        }

    })
}
//修改头像
const updatePic=(req,res)=>{
    cpUpload(req,res,(err)=>{
        if(err){
            console.log("失败");
        }else{
            let urlPath="http://localhost:9000/images/"+req.files.file[0].filename;//服务器给的公共地址
            res.json({//服务器返回给用户的数据
                code:200,
                errMsg:"",
                data:{
                    urlPic:urlPath
                }
            })
        }

    })
}
module.exports = {
    uploadImage,
    updatePic
}