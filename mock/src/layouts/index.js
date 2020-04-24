import React, { Component } from 'react'
import styles from './index.css';
import router from 'umi/router';
import { Layout, Menu, Icon } from 'antd';
// import Hidden from '../../src/pages/components/hidden/index'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class BasicLayout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  //登录
  login() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
  //注册
  register() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
  //登录后进入的页面
  logined() {
    return (
      <div className="content">
        <Layout>
          <Header className="header">
            <div className={styles.logo}>
              <span className="title_logo">
                家政预约管理系统
          </span>

            </div>



            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >

              <Menu.Item key="3" onClick={() => this.handleExit()} >退出登录</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                  家政管理
                </span>
                  }
                >

                  {/* <Menu.Item key="1" onClick={() => { router.push('/home') }}>人员信息管理</Menu.Item>
                  <Menu.Item key="2" onClick={() => this.handleToOne()} >用户预约列表</Menu.Item> */}
                  <Menu.Item key="1" onClick={() => { localStorage.getItem('userstatus') === 'superadmin' ? router.push('/home') : alert("您无权访问") }}>人员信息管理</Menu.Item>
                  <Menu.Item key="2" onClick={() => { localStorage.getItem('userstatus') === 'admin' ? router.push('/serveList') : alert("您无权访问") }} >用户预约列表</Menu.Item>
                  <Menu.Item key="3" onClick={() => { localStorage.getItem('userstatus') === 'unadmin' ? router.push('/addServe') : alert("您无权访问") }}>完善信息</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                  订单管理
                </span>
                  }
                >
                  {/* 
                  /mineAppointment
                  /mineOrder
                  */}
                  <Menu.Item key="4" onClick={() => { localStorage.getItem('userstatus') === 'admin' ? router.push('/mineOrder') : alert("您无权访问") }}>我的订单</Menu.Item>
                  <Menu.Item key="5" onClick={() => { localStorage.getItem('userstatus') === 'unadmin' ? router.push('/mineAppointment') : alert("您无权访问") }}>我的预约</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                  subnav 3
                </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px', height: '684px' }}>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
  render() {
    if (this.props.location.pathname === '/login') {
      return this.login();
    } else if (this.props.location.pathname === '/register') {
      return this.register();
    } else {
      return this.logined();
    }

  }

  // 首页跳转

  // handleTo(){
  //   console.log(localStorage.getItem('userstatus'))
  //   if(localStorage.getItem('userstatus')==='admin'){
  //     router.push('/home');
  //   }
  //   else{
  //     alert('你无权范文')
  //   }


  // }
  //跳转管理员发布服务
  handleToOne() {
    if (localStorage.getItem("userstatus") === "admin") {
      router.push('/serveList')
    } else {
      alert("您无权访问")
    }
    //  
  }
  handleExit() {
    localStorage.removeItem("usersid")
    localStorage.removeItem("userstatus")
    router.push('/login')
  }
  //跳转添加服务列表
  handleToTwo() {
    router.push('/addServe')
  }
}

