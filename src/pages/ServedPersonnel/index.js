import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Tooltip, Drawer, Menu, Dropdown } from 'antd';
import { DiffFilled, DeleteOutlined, SettingTwoTone } from '@ant-design/icons';
import _ from 'lodash';
class index extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      list: [],
      Yylist: [],
      YyDetailvisible: false,
      visible: false,
      id: '',
      YyDetailcolumns: [
        {
          title: '身份证号',
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
          title: '订单状态',
          dataIndex: 'statues',
          key: 'statues',
          //render: (text, record, index) => {}
          //参数分别为当前行的值，当前行数据，行索引
          render: (text, record) => {
            return text === undefined ? '' : <Button>正在服务</Button>;
          },
        },
        // {
        //     title: '操作',
        //     dataIndex: 'delete',
        //     key: 'delete',
        //     render: (text, record) => {
        //         return (
        //             <div>
        //                 {
        //                     text === undefined ? <Button onClick={() => this.showModal(record._id,record.char)}>结束预约</Button> : ""
        //                 }

        //             </div>
        //         )
        //     }
        // },
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
          title: '操作',
          dataIndex: 'delete',
          key: 'delete',
          render: (text, record) => {
            const menu = (
              <Menu>
                <Menu.Item key="1" onClick={() => this.handleRecord(record)}>
                  <Button size={'small'}>
                    {/* <DiffFilled style={{ width: '20px' }}></DiffFilled> */}
                    预约详情
                  </Button>
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.handlereset(record._id)}>
                  <Button size={'small'}>
                    {/* <SettingTwoTone style={{ width: '20px' }}></SettingTwoTone> */}
                    重置密码
                  </Button>
                </Menu.Item>
                <Menu.Item key="4" onClick={() => this.hanndleDelete(record)}>
                  <Button size={'small'}>
                    {/* <DeleteOutlined /> */}
                    删除
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
          // render: (text, record) => (
          //   <div>
          //     <Tooltip title="查看预约详情">
          //       <DiffFilled
          //         style={{ width: '50px' }}
          //         onClick={() => this.handleRecord(record)}
          //       ></DiffFilled>
          //     </Tooltip>
          //     <Tooltip title="一键重置密码">
          //       <SettingTwoTone
          //         style={{ width: '20px' }}
          //         onClick={() => this.handlereset(record._id)}
          //       ></SettingTwoTone>
          //     </Tooltip>
          //     <Tooltip title="删除">
          //       <DeleteOutlined onClick={() => this.hanndleDelete(record)} />
          //     </Tooltip>
          //   </div>
          // ),
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
  onClose = () => {
    this.setState({
      YyDetailvisible: false,
    });
  };
  handleRecord(record) {
    console.log(record._id);
    let userId = record._id;
    let payload = {
      userId,
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'service/mineOrderList',
        resolve,
        reject,
        payload,
      });
    }).then(res => {
      console.log(res.data.data.orderinfo[1]);
      //   var data = [];
      //   let s = _.map(res.data.data.orderinfo, 'serviceInfo');
      //   s.map(function (value, index, array) {
      //     data = data.concat(value);
      //   });
      //   console.log(s);
      //   data.shift();
      this.setState({
        Yylist: res.data.data.orderinfo,
        YyDetailvisible: true,
      });
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
          title="预约详情"
          placement="bottom"
          closable={false}
          onClose={this.onClose.bind(this)}
          visible={this.state.YyDetailvisible}
          style={{ position: 'absolute', overflow: 'auto' }}
          bodyStyle={{ height: '400px', overflow: 'auto' }}
          height={400}
        >
          <Table dataSource={this.state.Yylist} columns={this.state.YyDetailcolumns} />
        </Drawer>
      </div>
    );
  }
  componentDidMount() {
    this.renderList();
  }
  renderList() {
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
      let filterData = _.filter(data.data, e => e.userstatus === 'admin');
      this.setState({
        list: filterData,
      });
    });
  }
  hanndleDelete(record) {
    this.setState({
      visible: true,
      id: record._id,
    });
  }
  handleOk = e => {
    this.setState({
      visible: false,
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
