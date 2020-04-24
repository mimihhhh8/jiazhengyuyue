import React, { Component } from 'react';
import { Contents } from './styled.js';
import { Input, Tooltip, Icon, Radio, Button, Select } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'admin',
      username: '',
      password: '',
      loginid: '',
      phone: 0,
      sex: '男',
      age: 0,
      detailaddress: '',
    };
    // const { Option } = Select;
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
          <div className="loginid">
            <Input //用户id
              placeholder="loginid"
              prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
              onChange={this.loginid}
            />
          </div>
          <div className="phone">
            <Input //用户手机号
              placeholder="phone"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
              onChange={this.phone}
            />
          </div>
          {/* 性别 */}
          <div className="sex">
            <Select
              defaultValue="男"
              style={{ width: 120 }}
              onChange={(value) => this.handleChange(value)}
            >
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </div>
          {/* 年龄 */}
          <div className="age">
            <Input
              placeholder="age"
              prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
              onChange={this.age}
            />
          </div>
          {/* 详细地址 */}
          <div className="detailaddress">
            <Input
              placeholder="detailed address "
              prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Tooltip title="Extra information">
                  <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
              onChange={this.detailaddress}
            />
          </div>
          <div className="userpass">
            <Input.Password
              placeholder="password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={this.userPassword}
            />
          </div>
          {/* 

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
*/}

          <div className="jump_link">
            <Button type="primary" onClick={() => this.handleSubmit()}>
              注册
            </Button>
            <Button
              type="primary"
              style={{ marginleft: '30px' }}
              onClick={() => {
                router.push('/login');
              }}
            >
              登录
            </Button>
          </div>
        </div>
      </Contents>
    );
  }
  //事件
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  //用户名
  userName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  //用户id
  loginid = (e) => {
    this.setState({
      loginid: e.target.value,
    });
  };
  //用户手机号
  phone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };
  //用户性别
  handleChange(value) {
    this.setState({
      sex: value,
    });
  }
  //用户年龄
  age = (e) => {
    this.setState({
      age: e.target.value,
    });
  };
  //详细地址
  detailaddress = (e) => {
    this.setState({
      detailaddress: e.target.value,
    });
  };
  //用户密码
  userPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  //点击注册将信息发送给后端
  handleSubmit() {
    let { value, username, password, loginid, phone, sex, age, detailaddress } = this.state;
    let payload = {
      username,
      password,
      value,
      loginid,
      phone,
      sex,
      age,
      detailaddress,
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        //user/register,user是model里的命名空间，register是命名空间里的一个方法
        type: 'user/register',
        resolve,
        reject,
        payload,
      });
    }).then((data) => {
      if (data.data.status === 1) {
        alert(data.data.info);
      } else {
        alert(data.data.info);
      }
    });
  }
}
function mapStateToProps(state) {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(index);
