const serviceModel = require("../model/service");
const userModel = require("../model/user");
//服务列表
const serviceList = async (req, res) => {
    let { serviceSearch } = req.query
    let data = await serviceModel.serviceList(serviceSearch);
    //给前端返回数据用res.json
    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            data: data
        })
    } else {
        res.json({
            code: 200,
            info: "数据请求失败"
        })
    }
}
//管理员添加服务
const serviceSave = async (req, res) => {

    let {workeraddress, char,servicetype, task, statues, experience, id, _id,
        username,
        registerTime,
        name,
        loginid,
        phone,
        age,
        sex,
        detailaddress, } = req.body;
    let record={
        workeraddress,
        char,
        servicetype,
        task,
        statues,
        experience,
        _id,
        username,
        registerTime,
        name,
        loginid,
        phone,
        age,
        sex,
        detailaddress,

    }
    let saveOrderList = await userModel.saveServiceInfo(record, id)
    if (saveOrderList.ok === 1){
        res.json({
                    code: 1,
                    errMsg: "",
                    message:"完善成功"
                })
    }else{
        res.json({
            code: 0,
            errMsg: "",
            message:"服务器错误"
        })
    }
}
//修改预约状态
const updateStatues = async (req, res) => {
    //解构的变量名称与前端payload内的变量名称要一致
    // record为serveList下的index.js中<Switch/>组件中事件on-changge传过来的参数，record代表当前行的所有内容
    let { flag, id, userid, record,yytime } = req.body;
    // console.log(record)
    let data = await userModel.updateStatues(flag,yytime, id,userid);
    console.log(data)
    if (data.ok === 1 && flag === true) {
        let saveOrderList = await userModel.saveOrderInfo(record, userid)
        let userDetailInfoList = await userModel.userDetailInfo(userid)
        res.json({
            code: 200,
            errMsg: "",
            info: "预约成功",
            data: data,
            saveOrderList: saveOrderList,
            userDetaiInfoList: userDetailInfoList
        })
    } else if (data.ok === 1 && flag === false) {
        res.json({
            code: 400,
            info: "您已取消预约"
        })
    } else {
        res.json({
            code: 500,
            info: "数据库错误"
        })
    }
}
const SqFw = async (req, res) => {
    //解构的变量名称与前端payload内的变量名称要一致
    // record为serveList下的index.js中<Switch/>组件中事件on-changge传过来的参数，record代表当前行的所有内容
    let { fwid,userid } = req.body;
    let data = await userModel.SqFw(fwid,userid);
    console.log(data)
        res.json({
            code: 200,
            errMsg: "",
            info: "预约成功",
            data: data,
        })

}
const updateJurisdiction = async (req, res) => {
    //解构的变量名称与前端payload内的变量名称要一致
    // record为serveList下的index.js中<Switch/>组件中事件on-changge传过来的参数，record代表当前行的所有内容
    let { flag, id} = req.body;
    console.log(flag, id)
    let data = await userModel.updateJurisdiction(flag,id);
    // console.log(data)
    if (data.ok === 1) {
        res.json({
            code: 200,
            errMsg: "",
            info: "修改成功",
            data: data
        })
    } else if (data.ok === 1 && flag === false) {
        res.json({
            code: 400,
            info: "您已取消预约"
        })
    } else {
        res.json({
            code: 500,
            info: "数据库错误"
        })
    }
}
// 我的订单列表
const mineOrderList = async (req, res) => {
    let { userId } = req.body;

    let list = await userModel.userDetailInfo(userId);
    if (list) {
        res.json({
            code: 200,
            errMsg: "",
            info: "获取列表成功",
            data: list
        })
    } else {
        res.json({
            code: 500,
            errMsg: "",
            info: "获取列表失败",
        })
    }
}
//取消预约
/**
 * 
 * db.mycollection.update(
    {'_id': ObjectId("5150a1199fac0e6910000002")},
    { $pull: { "items" : { id: 23 } } }
); 
 */
const cancleOrder = async (req, res) => {
    let { flag, id, userId,value } = req.body
    let cancleOrderList = await userModel.cancleOrder(flag, id);
    let pingjia = await userModel.pingjia(value, id);
    console.log(pingjia)
    let setOrder = await userModel.deleteYuyueUser(userId, id);
    if (cancleOrderList && setOrder) {
        res.json({
            code: 200,
            errMsg: "",
            info: "取消预约",
            data: cancleOrderList
        })
    } else {
        res.json({
            code: 500,
            errMsg: "",
            info: "取消预约失败",
        })
    }
}
// 管理员删除人员信息
const deleteWorkerInfo = async (req, res) => {
    let { id } = req.query
    let data = await userModel.deleteWorkerInfo(id)
    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            info: "删除成功"
        })
    } else {
        res.json({
            code: 200,
            errMsg: "",
            info: "删除失败"
        })
    }
}
module.exports = {
    SqFw,
    updateJurisdiction,
    serviceList,
    serviceSave,
    updateStatues,
    mineOrderList,
    cancleOrder,
    deleteWorkerInfo
}