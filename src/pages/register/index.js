import React, { Component } from 'react';
import { Contents } from './styled.js';
import { Form, Icon,Input, message, Radio, Button, Select } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
class index extends Component {
  constructor(props) {
    super(props);
    this.onChange=this.onChange.bind(this)
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
          <div>
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
            />,
          )}
          </Form.Item>
          {/* loginid */}
          <Form.Item>
          {getFieldDecorator('loginid', {
            rules: [
              { required: true,message: '请输入身份证号码！',min:4},
              { message: '请输入正确的身份证号码',pattern:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ },//+号可以匹配任意多个字符
            ],
            initialValue: '', // 初始值
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="身份证号码"
            />,
          )}
          </Form.Item>

          <Form.Item>
          {getFieldDecorator('phone', {
            rules: [
              { required: true,message: '请输入正确的手机号',min:4},
              { message: '请输入正确的手机号',pattern:/^1[3456789]\d{9}$/ },
            ],
            initialValue: '', // 初始值
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="手机号"
            />,
          )}
          </Form.Item>    

          <Form.Item>
          {getFieldDecorator('sex', {
            rules: [
              { required: true,message: '请输入性别！',min:1},
            ],
            initialValue: '', // 初始值
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="性别"
            />,
          )}
          </Form.Item>   
          <Form.Item>
          {getFieldDecorator('age', {
            rules: [
              { required: true,message: '请正确输入您的年龄！',min:1},
              { message: '请正确输入您的年龄！',pattern:/^(?:[1-9][0-9]?|1[01][0-9]|120)$/ },
              // { required: true,message: '请输入您的年龄！',min:1},
            ],
            initialValue: '', // 初始值
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入您的年龄"
            />,
          )}
          </Form.Item>   
          <Form.Item>
          {getFieldDecorator('detailaddress', {
            rules: [
              // { message: '请正确输入您的详细地址！',pattern:/^(?:[1-9][0-9]?|1[01][0-9]|120)$/ },
              { required: true,message: '请正确输入您的您的详细地址长度应大于10小于200位！！',min:1},
              { message: '您的详细地址长度应大于10小于200位！',min:10,max:200},
            ],
            initialValue: '', // 初始值
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入您的详细地址"
            />,
          )}
          </Form.Item>   
          <Form.Item>
          <div className="jump_link">
            <Button type="primary" htmlType="submit" className='login-btn' onClick={() => this.handleSubmit()}>
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
          </Form.Item>
        </Form>
          </div>
        </div>
      </Contents>
    );
  }

  // 自定义密码验证规则
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
              //user/register,user是model里的命名空间，register是命名空间里的一个方法
              type: 'user/register',
              resolve,
              reject,
              payload,
            });
          }).then((data) => {
            if (data.data.status === 1) {
              message.success(data.data.info);
            } else {
              // message.error(data.data.info);
            }
          });
        }
      });
  };
  onChange(e){
    this.setState({
      value:e.target.value
    })
  }
}
const WrappeLoginForm = Form.create({ name: 'normal_login' })(index);
function mapStateToProps(state) {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(WrappeLoginForm);
