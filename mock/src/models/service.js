import servers from "../servers/servers";

export default {
    namespace:'service',
    state:{
        userOrderInfo:''
    },
    reducers:{
        userOrderInfo(state,{userOrderInfo}){
            return {...state,userOrderInfo}
        }
    },
    effects:{
        *serviceList({reject,resolve,payload},{call,put}){
            const res=yield call(servers.serviceList['serviceList'],{payload})
            if(res){
                resolve(res.data)
            }
        },
        *serviceSave({reject,resolve,payload},{call,put}){
            const res=yield call(servers.serviceSave['serviceSave'],{payload})
            if(res){
                resolve(res.data)
            }
        },
        //修改状态
        *updateStatues({reject,resolve,payload},{call,put}){
            const res=yield call(servers.updateStatues['updateStatues'],{payload})
            yield put({type:"userOrderInfo",userOrderInfo:res})
            if(res){
                resolve(res)
            }
        },
        *updateJurisdiction({reject,resolve,payload},{call,put}){
            const res=yield call(servers.updateJurisdiction['updateJurisdiction'],{payload})
            yield put({type:"userOrderInfo",userOrderInfo:res})
            if(res){
                resolve(res)
            }
        },
        // 我的订单列表
        *mineOrderList({reject,resolve,payload},{call,put}){
            const res=yield call(servers.mineOrderList['mineOrderList'],{payload})
            if(res){
                resolve(res)
            }
        },
        // 取消预约
        *cancleOrder({reject,resolve,payload},{call,put}){
            const res=yield call(servers.cancleOrder['cancleOrder'],{payload})
            if(res){
                resolve(res)
            }
        },
        // 管理员删除人员信息
        *deleteWorkerInfo({reject,resolve,payload},{call,put}){
            const res=yield call(servers.deleteWorkerInfo['deleteWorkerInfo'],{payload})
            console.log(res)
            if(res){
                resolve(res)
            }
        },
    }
}