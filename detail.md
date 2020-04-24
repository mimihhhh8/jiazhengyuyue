前后端启动都是用:npm start

一、手动写路由在.umirc.js中

二、前后端的连接

（1）在utils文件夹下的reques.js文件中封装请求需要用到的post、get等方法。

（2）在servers文件夹下的servers.js文件中写走后端的接口，payload是前端传的参数

```
 login:{

​        login:({payload})=>post('/users/login',payload)

​    }
```

（3）models文件夹下的user.js中的effects方法是异步方法调用

```
effects: {

​        //{ reject, resolve, payload }前端传的参数，{ call, put }

​        *login({ reject, resolve, payload }, { call, put }) {

​            //连接后端，通过yield call

​            const res = yield call(servers.login['login'], { payload })

 

​    }

}
```

（4）页面将前端数据返回给后端home文件夹下的index.js文件中

三、注册

username

loginid

phone

sex

password

age

detailaddress

四、管理员添加家政服务项目

四类：

月嫂：照顾婴幼儿

钟点工：进行按时付费，做饭烹饪，照顾老人，清洁家务。

保姆：

家庭教师：辅导学生作业，品德培养。

家庭维修员：维修水电，电脑，电器，门锁。

五、在用户预约列表页，显示预约成功以后，将服务人员的信息存入用户信息中

六、（1）新创建一个页面的流程（以“我的订单”页面为例）

pages文件夹下创建一个文件夹mineOrder，在文件夹mineOrder下创建index.js文件，在此文件夹中输入rcc回车，出现如下内容

```
import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <div>
                我的订单（自己添加内容部分）
            </div>
        )
    }
}

```

（2）在.umirc.js文件夹中配置路由

```
 {path:'/mineOrder',component:'../pages/mineOrder/index'},
```

（3）在layouts文件夹下的index.js中点击跳转到该页面

```
  <Menu.Item key="4" onClick={()=>{ router.push('/mineOrder')}}>我的订单</Menu.Item>
```

七、在一个页面请求到的数据需要在另一个页面使用的时候

利用 yield put

![](F:\houseorder\src\img\微信图片_20200301003549.png)

![](F:\houseorder\src\img\微信图片_20200301003557.png)

