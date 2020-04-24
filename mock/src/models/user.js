import servers from "../servers/servers";

export default {
    //命名空间
    namespace: 'user',
    //处理同步action,
    state:{
        userInfo:''
    },
    reducers: {
        userInfo(state,{userInfo}){
            return {...state,userInfo}
        }
    },

    //处理异步action
    //effects异步的方法调用
    effects: {
        //{ reject, resolve, payload }前端传的参数，{ call, put }
        *login({ reject, resolve, payload }, { call, put }) {
            //连接后端，通过yield call
            const res = yield call(servers.login['login'], { payload })
            //异步请求，向(servers.login['login']接口发出请求，传参为payload的值，res可以接受到后台传来的数据
           yield put({type:"userInfo",
           userInfo:res})
            if(res){
                resolve(res.data)
            }
 
    },
    *register({reject,resolve,payload},{call,put}){
        const res=yield call(servers.register['register'],{payload})
        if(res){
            resolve(res.data)
        }
    },
    // 重置密码
    *resetpassword({reject,resolve,payload},{call,put}){
        const res=yield call(servers.resetpassword['resetpassword'],{payload})
        if(res){
            resolve(res.data)
        }
    },

    *userInfoList({resolve,payload},{call,put}){
        const res=yield call(servers.userInfoList['userInfoList'],{payload})
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

}
}