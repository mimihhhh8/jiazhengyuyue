const {post,get}=require('../utils/request').default;
export default{
    //登录
    login:{
        login:({payload})=>post('/users/login',payload)
    },
    // zhuce
    register:{
        register:({payload})=>post('/users/register',payload)
    },
    //用户信息列表
    userInfoList:{
        userInfoList:({payload})=>get(`/users/userInfoList?serviceSearch=${payload.searchValue}`)
    },
    //服务列表
    serviceList:{
        serviceList:({payload})=>get(`/service/serviceList?serviceSearch=${payload.searchValue}`)
    },
    //完善信息,这里用到后端接口
    // /service是后端app.js中配置的（app.use("/service",serviceRouter);），/addService是后端routes文件夹下的service.js文件中的写的接口
    //
    serviceSave:{
        serviceSave:({payload})=>post('/service/addService',payload)
    },
    //修改预约状态
    updateStatues:{
        updateStatues:({payload})=>post('/service/updateStatues',payload)
    },
    // 重置密码
    resetpassword:{
        resetpassword:({payload})=>post('/users/resetpassword',payload)
    },
    updateJurisdiction:{
        updateJurisdiction:({payload})=>post('/service/updateJurisdiction',payload)
    },
    // 我的订单列表
    mineOrderList:{
        mineOrderList:({payload})=>post('/service/mineOrderList',payload)
    },
    // 取消预约
    
    cancleOrder:{
        cancleOrder:({payload})=>post('/service/cancleOrder',payload)
    },
    // 管理员删除人员信息
    deleteWorkerInfo:{
        deleteWorkerInfo:({payload})=>get(`/service/deleteWorkerInfo?id=${payload.id}`)
    }
} 
