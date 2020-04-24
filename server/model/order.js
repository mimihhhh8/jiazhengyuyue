const mongoose=require("../utils/database");
//设置数据库字段
const Userorder=mongoose.model("order",{
    username:String,
    phone:Number,
    date:Number,
    time:Number,
    remark:String
})

//提交用户信息
const submitInfo=(orderInfo)=>{
    return new Userorder(orderInfo).save();
}

module.exports={
    submitInfo
}