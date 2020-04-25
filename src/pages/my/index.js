import React, { Component } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Table, Tabs, Button, Modal, message } from 'antd';
import moment from 'moment';
const { TabPane } = Tabs;
class index extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: '1',
      list: '',
      id: '',
      fwid: '',
      Yylist: [],
      rec: '',
      flag: true,
      visible: false,
      YyDetailcolumns: [
        {
          title: '姓名',
          dataIndex: 'username',
          key: 'username',
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
      columns: [
        {
          title: '身份证号码',
          dataIndex: 'loginid',
          key: 'loginid',
        },
        {
          title: '姓名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
        },
        {
          title: '住址',
          dataIndex: 'workeraddress',
          key: 'workeraddress',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '订单类型',
          dataIndex: 'servicetype',
          key: 'servicetype',
        },
        {
          title: '任务',
          dataIndex: 'task',
          key: 'task',
        },
        {
          title: '费用（小时/元）',
          dataIndex: 'char',
          key: 'char',
        },
        {
          title: '工龄',
          dataIndex: 'experience',
          key: 'experience',
        },
        {
          title: '消息状态',
          dataIndex: 'fwid',
          key: 'fwid',
          render: (text, record) => {
            return (
              <div>
                {this.state.fwid === '' ? (
                  <Button>未预约</Button>
                ) : (
                  <div>
                    {this.state.flag ? (
                      <Button onClick={() => this.getuserDetail(this.state.fwid, 1, record)}>
                        您有一个消息
                      </Button>
                    ) : null}
                  </div>
                )}
              </div>
            );
          },
        },
      ],
    };
  }
  componentDidMount() {
    this.getdata();
  }
  getuserDetail(record, flag, rec) {
    if (flag) {
      this.setState({
        visible: true,
        rec,
        flag: false,
      });
    }
    let payload = {
      searchValue: '',
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'user/userInfoList',
        resolve,
        reject,
        payload,
      });
    }).then(data => {
      let filterData = _.filter(data.data, e => e._id === record);
      this.setState({
        Yylist: filterData,
      });
    });
  }
  dataRefresh = key => {
    //切换当面面板

    this.setState({
      activeIndex: key,
    });
  };
  getdata() {
    let payload = {
      userId: localStorage.getItem('usersid'),
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'service/mineOrderList',
        resolve,
        reject,
        payload,
      });
    }).then(res => {
      this.setState(
        {
          list: res.data.data.serviceInfo,
          id: res.data.data.yyid,
          fwid: res.data.data.fwid,
        },
        () => {
          this.getuserDetail(res.data.data.yyid);
        },
      );
    });
  }
  handleOk = e => {
    this.setState(
      {
        visible: false,
      },
      () => {
        let id = localStorage.getItem('usersid');
        var flag = true;
        //修改数据库中的预约状态
        let payload = {
          flag,
          id,
          userid: this.state.fwid,
          record: this.state.rec,
          yytime: moment().format('YYYY-MM-DD HH:mm'),
        };
        new Promise((resolve, reject) => {
          this.props.dispatch({
            type: 'service/updateStatues',
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
        });
      },
    );
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    this.state.Yylist.length > 0 ? console.log(this.state.Yylist) : console.log(0);
    return (
      <div>
        <Modal
          title="待审批详情"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            {this.state.Yylist.length > 0 ? (
              <div>
                <p>用户名为:{this.state.Yylist[0].username} 的客户想预约您为他服务，</p>
                <p>住址：{this.state.Yylist[0].detailaddress}</p>
                <p>联系电话：{this.state.Yylist[0].phone}</p>
              </div>
            ) : null}
          </div>
        </Modal>
        <Tabs
          defaultActiveKey={this.state.activeIndex}
          activeKey={this.state.activeIndex}
          onChange={key => this.dataRefresh(key)}
          type="card"
        >
          <TabPane tab="我的个人信息" key="1">
            <Table
              rowKey={item => item._id}
              dataSource={this.state.list}
              columns={this.state.columns}
            />
          </TabPane>
          {/* <TabPane tab="查看我的预约" key="2">
            <Table dataSource={this.state.Yylist} columns={this.state.YyDetailcolumns} />}
          </TabPane> */}
        </Tabs>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(index);
