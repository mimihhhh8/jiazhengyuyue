import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Table,
  Button,
  Modal,
  Tooltip,
  Drawer,
  message,
  Menu,
  List,
  Typography,
  Divider,
} from 'antd';
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
                <Button onClick={() => this.hanndleDeletePj(record)}>删除</Button>
              </div>
            );
          },
        },
      ],
    };
  }

  hanndleDeletePj(record) {
    console.log(record);
    let payload = {
      username: record.username,
      id: record.fwname,
    };
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'user/delpingjia',
        resolve,
        reject,
        payload,
      });
    }).then(res => {
      message.success('删除成功');
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
    this.setState({
      pingjiavisible: true,
      pingjia: record.pingjia,
      logid: record.loginid,
    });
  }
  render() {
    var data = [];
    this.state.list.map(function(value, index, array) {
      data = data.concat(value);
    });
    console.log(data);
    return (
      <div>
        <Table rowKey={item => item._id} columns={this.state.pingjiacolumns} dataSource={data} />
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
      let filterData = _.filter(data.data, e => e.userstatus == 'unadmin' && e.pingjia.length > 0);
      console.log(filterData);
      this.setState({
        list: _.map(filterData, 'pingjia'),
      });
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
