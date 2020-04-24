// 引人mongoose依赖
const mongoose =require("mongoose");

// 创建数据库
const db_url="mongodb://127.0.0.1:27017/classweb";
//链接数据库

mongoose.connect(db_url);

// 导出数据库
module.exports=mongoose;
