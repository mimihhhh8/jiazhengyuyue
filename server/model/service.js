const mongoose=require('../utils/database');

const Service=mongoose.model("yservice",{
    id:Number,
    workername:String,
    workeraddress:String,
    servicetype:String,
    task:String,
    statues:Boolean,
    experience:String,
})

const serviceList=(searchValue)=>{
    if(searchValue==='')
    {
        return Service.find();
    }else if(searchValue!==''){

        return Service.find({servicetype:{$regex:searchValue}})
    }
}
//添加服务
const serviceSave=(info)=>{
    let service=new Service(info);
    return service.save()
}
//修改预约状态,修改的时候需要有id作为唯一标识
const updateStatues=(value,id)=>{
    return Service.update({_id:id},{$set:{statues:value}})
}
// 我的订单列表
const mineOrderList=(id)=>{
    return Service.findOne({ _id: id });
}
// 在添加服务列表的时候，限制相同id不能添加两次
const userDetailWorkerid=(workerid)=>{
    return Service.findOne({ id: workerid });
}

// 取消预约
const cancleOrder=(flag,id)=>{
    return Service.update({ _id: id }, { $set: { statues: flag } })
}
// 
module.exports={
    userDetailWorkerid,
    serviceList,
    serviceSave,
    updateStatues,
    mineOrderList,
    cancleOrder
}