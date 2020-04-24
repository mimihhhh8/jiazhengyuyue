import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Tooltip, Drawer, message, Menu, Dropdown } from 'antd';
import {
  DiffFilled,
  DeleteOutlined,
  UserOutlined,
  LikeTwoTone,
  SettingTwoTone,
} from '@ant-design/icons';
import _ from 'lodash';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      list: [],
      searchValue: '',
      Yylist: [],
      pingjia: [],
      logid: '',
      visible: false,
      pingjiavisible: false,
      Detailvisible: false,
      YyDetailvisible: false,
      record: '',
      recordLength: '',
      id: '',
      YyDetailcolumns: [
        {
          title: '员工ID',
          dataIndex: '_id',
          key: '_id',
        },
        {
          title: '姓名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '注册时间',
          dataIndex: 'registerTime',
          key: 'registerTime',
        },
        {
          title: '身份证号码',
          dataIndex: 'loginid',
          key: 'loginid',
        },
        {
          title: '电话号码',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '家庭住址',
          dataIndex: 'detailaddress',
          key: 'detailaddress',
        },
      ],
      pingjiacolumns: [
        {
          title: '用户',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '客户',
          dataIndex: 'fwname',
          key: 'fwname',
        },
        {
          title: '评价内容',
          dataIndex: 'value',
          key: 'value',
        },
        {
          title: '时间',
          dataIndex: 'pjtime',
          key: 'pjtime',
        },

        {
          title: '操作',
          dataIndex: 'delete',
          key: 'delete',
          render: (text, record) => {
            return (
              <div>
                <Tooltip title="删除">
                  <DeleteOutlined onClick={() => this.hanndleDeletePj(record)} />
                </Tooltip>
              </div>
            );
          },
        },
      ],
      Detailcolumns: [
        {
          title: '员工地址',
          dataIndex: 'workeraddress',
          key: 'workeraddress',
        },
        {
          title: '服务类型',
          dataIndex: 'servicetype',
          key: 'servicetype',
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
        },
        {
          title: '工作年限',
          dataIndex: 'experience',
          key: 'experience',
        },
      ],
      columns: [
        {
          title: '姓名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '身份证号',
          dataIndex: 'loginid',
          key: 'loginid',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'detailaddress',
          key: 'detailaddress',
        },
        {
          title: '预约时间',
          dataIndex: 'yytime',
          key: 'yytime',
          render: (t, record) => {
            console.log(record.status);
            return <div>{record.status ? t : '未预约不显示时间哦'}</div>;
          },
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          render: (t, record) => {
            return (
              <div>
                {t ? (
                  <Tooltip title="查看预约详情">
                    <span onClick={() => this.handleRecord(record.yyid)}>已预约</span>
                  </Tooltip>
                ) : (
                  '未预约'
                )}
              </div>
            );
          },
        },
        {
          title: '操作',
          dataIndex: 'delete',
          key: 'delete',
          render: (text, record) => {
            const menu = (
              <Menu>
                <Menu.Item key="1" onClick={() => this.handleRecord(record)}>
                  <Button size={'small'}>
                    {/* <DiffFilled style={{ width: '20px' }}></DiffFilled> */}
                    服务详情
                  </Button>
                </Menu.Item>
                <Menu.Item key="2">
                  <Button size={'small'} onClick={() => this.handlepingjia(record)}>
                    评价
                  </Button>
                </Menu.Item>
                <Menu.Item key="4" onClick={() => this.hanndleDelete(record)}>
                  <Button size={'small'}>
                    {/* <DeleteOutlined /> */}
                    删除
                  </Button>
                </Menu.Item>
                <Menu.Item key="3" onClick={() => this.handlereset(record._id)}>
                  <Button size={'small'}>
                    {/* <SettingTwoTone style={{ width: '20px' }}></SettingTwoTone> */}
                    重置密码
                  </Button>
                </Menu.Item>
              </Menu>
            );
            return (
              <div>
                <Dropdown overlay={menu}>
                  <Button>更多</Button>
                </Dropdown>
              </div>
            );
          },
        },
      ],
    };
  }
  handlereset(id) {
    let payload = {
      id,
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'user/resetpassword',
        resolve,
        reject,
        payload,
      });
    }).then(res => {
      alert(res.info);
    });
  }
  hanndleDeletePj(record) {
    let payload = {
      username: record.username,
      id: this.state.logid,
    };
    console.log(payload);
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'user/delpingjia',
        resolve,
        reject,
        payload,
      });
    }).then(res => {
      message.success('删除成功');
      this.setState({
        pingjiavisible: false,
      });
      this.renderList();
    });
  }
  onChange(value, id, record) {
    var flag = '';
    if (value === true) {
      flag = false;
    } else {
      flag = true;
    }
    //修改数据库中的预约状态
    let payload = {
      flag,
      id,
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'service/updateJurisdiction',
        resolve,
        reject,
        payload,
      });
    }).then(res => {
      if (res.data.code === 200) {
        message.success(res.data.info);
      } else if (res.data.code === 200) {
        message.success(res.data.info);
      } else {
        message.error(res.data.info);
      }
      this.renderList();
    });
  }
  handlepingjia(record) {
    // this.props.history.push('/PJmanage');
    this.setState({
      pingjiavisible: true,
      pingjia: record.pingjia,
      logid: record.loginid,
    });
  }
  render() {
    return (
      <div>
        <Table
          rowKey={item => item._id}
          columns={this.state.columns}
          dataSource={this.state.list}
        />
        <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>你确定要删除该人员信息吗？</p>
        </Modal>

        <Drawer
          title="评价管理"
          placement="bottom"
          closable={false}
          onClose={this.handleCancel.bind(this)}
          visible={this.state.pingjiavisible}
          style={{ position: 'absolute', overflow: 'auto' }}
          bodyStyle={{ height: '400px', overflow: 'auto' }}
          height={700}
        >
          <Table
            rowKey={item => item}
            dataSource={this.state.pingjia}
            columns={this.state.pingjiacolumns}
          />
        </Drawer>
        {/* 详情抽屉 */}
        <Drawer
          title="服务类型"
          placement="bottom"
          closable={false}
          onClose={this.onClose.bind(this)}
          visible={this.state.Detailvisible}
          style={{ position: 'absolute', overflow: 'auto' }}
          bodyStyle={{ height: '400px', overflow: 'auto' }}
          height={400}
        >
          {this.state.recordLength === 0 ? (
            <span>该用户还未完善信息</span>
          ) : (
            <Table dataSource={this.state.record} columns={this.state.Detailcolumns} />
          )}
        </Drawer>
        <Drawer
          title="预约详情"
          placement="bottom"
          closable={false}
          onClose={this.onClose.bind(this)}
          visible={this.state.YyDetailvisible}
          style={{ position: 'absolute', overflow: 'auto' }}
          bodyStyle={{ height: '400px', overflow: 'auto' }}
          height={400}
        >
          <Table dataSource={this.state.Yylist} columns={this.state.YyDetailcolumns} />}
        </Drawer>
      </div>
    );
  }
  onClose = () => {
    this.setState({
      Detailvisible: false,
      YyDetailvisible: false,
    });
  };
  componentDidMount() {
    this.renderList();
  }
  renderList() {
    let payload = {
      searchValue: this.state.searchValue,
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        //dispatch触发l一个action
        //user是命名空间（models中），login是user下面的方法
        type: 'user/userInfoList',
        resolve,
        reject,
        payload,
      });
    }).then(data => {
      let filterData = _.filter(data.data, e => e.userstatus == 'unadmin');
      this.setState({
        list: filterData,
      });
      console.log(filterData);
    });
  }
  hanndleDelete(record) {
    this.setState({
      visible: true,
      id: record._id,
    });
  }
  getuserDetail(record) {
    let payload = {
      searchValue: '',
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        //dispatch触发l一个action
        //user是命名空间（models中），login是user下面的方法
        type: 'user/userInfoList',
        resolve,
        reject,
        payload,
      });
    }).then(data => {
      let filterData = _.filter(data.data, e => e._id === record);
      this.setState({
        Yylist: filterData,
        YyDetailvisible: true,
      });
      console.log(filterData);
    });
  }
  handleRecord(record) {
    console.log(record.serviceInfo, 345);
    if (record.serviceInfo === undefined) {
      this.getuserDetail(record);
    } else {
      this.setState({
        recordLength: record.serviceInfo.length,
        record: record.serviceInfo,
        Detailvisible: true,
      });
    }
  }
  handleOk = e => {
    this.setState({
      visible: false,
      pingjiavisible: false,
    });
    let id = this.state.id;
    let payload = {
      id,
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'service/deleteWorkerInfo',
        resolve,
        reject,
        payload,
      });
    }).then(res => {
      this.renderList();
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      pingjiavisible: false,
    });
  };
}

//映射
function mapStateToProps(state) {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(index);
// connect方法用来连接models层的state数据，参数常用的有2个，是第一个mapStateToProps，第二个mapDispatchToProps
// mapStateToProps按字面意思：把models层state数据变为组件的props
// mapDispatchToProps：用了此方法，dispatch只会在此方法里。不写该参数，dispatch会作为组件的props。(我平常用几乎不写该方法)
// export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
