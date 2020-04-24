const mongoose = require("../utils/database");
const Date = mongoose.model("hours", {
    date: String,
    date_status: String,
    date_type: String,
    hour: String
})

const dateFind = (page, limit, startDate, endDate,typeDate) => {
    page = Number(page);
    limit = Number(limit);
    startDate = String(startDate);
    endDate = String(endDate);
    if (startDate === ''&&typeDate==='') {
        //正常的显示数据库中请求过来的数据
        return Date.find().skip((page - 1) * limit).limit(limit);
    } else if(typeDate===''){
        //根据日期查询出的数据
        return Date.find({ date: { $gte: startDate, $lte: endDate }}).skip((page - 1) * limit).limit(limit);
    }else{
        //根据日期及数据类型查询出的数据
        return Date.find({ date: { $gte: startDate, $lte: endDate },date_type:{'$in':typeDate}}).skip((page - 1) * limit).limit(limit); 
    }

}
//数据总条数
const dataTotal = () => {
    return Date.find().count();
}
//日期查询数据总条数
const searchDate = (startDate, endDate) => {
    startDate = String(startDate);
    endDate = String(endDate);
    return Date.find({ date: { $gte: startDate, $lte: endDate } }).count();
}
//日期及数据类型查询出的数据总条数
const typeDate_searchDate=(startDate, endDate,typeDate)=>{
    startDate = String(startDate);
    endDate = String(endDate);
    return Date.find({ date: { $gte: startDate, $lte: endDate },date_type:typeDate}).count();

}
//去重后的数据类型，需要在前端的select组件用的数据
const dateType=()=>{
    return Date.find().distinct("date_type")
}
//导出
module.exports = {
    dateFind,
    dataTotal,
    searchDate,
    dateType,
    typeDate_searchDate
}