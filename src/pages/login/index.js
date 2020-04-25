import React, { Component } from 'react';
import { Contents } from './styled.js';
import {Form ,Input, Tooltip, Icon, Radio, Button, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'admin',
      username: '',
      password: '',
    };
  }
  //渲染
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Contents>
        <div className="Centerbox">
          <div className="logo">
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580727104224&di=a934c2b465d735d62dbe924fbd1686b0&imgtype=0&src=http%3A%2F%2Fwww.hfhey.com%2Fupload%2Fimage%2F20150730%2F20150730143749774977.jpg"
              alt=""
            />
          </div>
          <div className="radio">
            <Radio.Group onChange={this.onChange} value={this.state.value}>
              <Radio value={'admin'}>客户</Radio>
              <Radio value={'superadmin'}>管理员</Radio>
              <Radio value={'unadmin'}>服务人员</Radio>
            </Radio.Group>
          </div>
          <Form onSubmit={this.handleSubmit} className="">
          <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true,message: '请输入用户名！',min:4},
              { message: '用户名长度应大于3小于12位！',min:3,max:12},
              { message: '用户名只能含有数字、英文、下划线!',pattern:/^[a-zA-Z0-9_]+$/ },//+号可以匹配任意多个字符
            ],
            initialValue: 'admin', // 初始值
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { validator:this.validatorPwd},//自定义校验规则
            ],
            initialValue: 'admin', // 初始值
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          )}
          </Form.Item>

         
          <Form.Item>
          <div className="jump_link">
            <Button type="primary" htmlType="submit" className='login-btn' onClick={() => this.handleSubmit()}>
              登录
            </Button>
            <Button
              type="primary"
              style={{ marginleft: '30px' }}
              onClick={() => {
                router.push('/register');
              }}
            >
              注册
            </Button>
          </div>
          </Form.Item>
        </Form>
        </div>
      </Contents>
    );
  }
  //事件
  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  validatorPwd=(rule, value, callback)=>{
    // 无论验证成功与否callback()必须调用
    if(!value){
      callback('请输入密码！')
    }else if(value.length<4||value.length>12){
      callback('密码长度应大于4小于12位！') //验证不通过传入错误提示
    }
    callback()//验证成功无提示
  }
  handleSubmit = e => {
    this.props.form.validateFields(
      async (err, values) => { //可以对所有结果校验，并返回结果
        if (!err) {
          values.value=this.state.value;
         const  payload=Object.assign(values)
         new Promise((resolve, reject) => {
          this.props.dispatch({
            type: 'user/login',
            resolve,
            reject,
            payload,
          });
        }).then(data => {
          console.log(data, 'user');
          if (data.data.code === 1) {
            // alert(data.data.info);
            localStorage.setItem('userstatus', data.data.data.userstatus);
            localStorage.setItem('usersid', data.data.data._id);
            localStorage.setItem('name', data.data.data.username);
            if (localStorage.getItem('userstatus') === 'admin') {
              router.push('/serveList');
            } else if (localStorage.getItem('userstatus') === 'unadmin') {
              router.push('/addServe');
            } else if (localStorage.getItem('userstatus') === 'superadmin') {
              router.push('/admin');
            } else {
              // alert('什么情况');
            }
          } else {
            // alert(data.data.info);
            message.error(data.data.info);
          }
        });
        }
      });
  };
  // handleSubmit() {
  //   //value,username,password在使用这三个值的时候需要先解构出来
 
  //   // console.log(value,username,password)
  //   let payload = {
  //     username,
  //     password,
  //     value,
  //   };
  //   new Promise((resolve, reject) => {
  //     this.props.dispatch({
  //       type: 'user/login',
  //       resolve,
  //       reject,
  //       payload,
  //     });
  //   }).then(data => {
  //     console.log(data, 'user');
  //     if (data.data.code === 1) {
  //       // alert(data.data.info);
  //       localStorage.setItem('userstatus', data.data.data.userstatus);
  //       localStorage.setItem('usersid', data.data.data._id);
  //       localStorage.setItem('name', data.data.data.username);
  //       if (localStorage.getItem('userstatus') === 'admin') {
  //         router.push('/serveList');
  //       } else if (localStorage.getItem('userstatus') === 'unadmin') {
  //         router.push('/addServe');
  //       } else if (localStorage.getItem('userstatus') === 'superadmin') {
  //         router.push('/admin');
  //       } else {
  //         // alert('什么情况');
  //       }
  //     } else {
  //       // alert(data.data.info);
  //       message.error(data.data.info);
  //     }
  //   });
  // }
}
//映射
const WrappeLoginForm = Form.create({ name: 'normal_login' })(index);
function mapStateToProps(state) {
  //解构出来个dispatch派发action(异步给了effect)(同步给了reducers)
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(WrappeLoginForm);
