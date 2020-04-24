import React, { Component } from 'react';
import { Contents } from './styled.js';
import { Input, Tooltip, Icon, Radio, Button, message } from 'antd';
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
          <div className="username">
            <Input //登录用户名
              placeholder="username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
              onChange={this.userName}
            />
          </div>
          <div className="userpass">
            <Input.Password
              placeholder="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={this.userPassword}
            />
          </div>
          <div className="submit"></div>
          <div className="jump_link">
            <Button type="primary" onClick={() => this.handleSubmit()}>
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
  //用户名
  userName = e => {
    this.setState({
      username: e.target.value,
    });
  };
  //用户密码
  userPassword = e => {
    this.setState({
      password: e.target.value,
    });
  };
  handleSubmit() {
    //value,username,password在使用这三个值的时候需要先解构出来
    let { username, password, value } = this.state;
    // console.log(value,username,password)
    let payload = {
      username,
      password,
      value,
    };
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
}
//映射
function mapStateToProps(state) {
  //解构出来个dispatch派发action(异步给了effect)(同步给了reducers)
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(index);
