import React, { Component } from 'react'
import { connect } from 'dva';
import _ from "lodash"
import { Table, Tabs, Button } from "antd";
const { TabPane } = Tabs;
class index extends Component {
    constructor() {
        super()
        this.state = {
            activeIndex: "1",
            list: "",
            id: "",
            Yylist: [],
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
            columns: [
                {
                    title: 'ID',
                    dataIndex: '_id',
                    key: '_id',
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
                    title: '身份证号码',
                    dataIndex: 'loginid',
                    key: 'loginid',
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
                    dataIndex: 'status',
                    key: 'status',
                    //render: (text, record, index) => {}
                    //参数分别为当前行的值，当前行数据，行索引
                    render: (text, record) => {
                        // console.log(text)
                        return (
                            <div>
                                {
                                    text? <Button>未预约</Button> : <Button>正在服务</Button>
                                }
                            </div>

                        )

                    }
                },

            ]
        }
    }
    componentDidMount() {
        this.getdata()
    }
    getuserDetail(record) {
        let payload = {
            searchValue: ""
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "user/userInfoList",
                resolve,
                reject,
                payload
            })
        }).then((data) => {
            let filterData = _.filter(data.data, e => e._id === record)
            this.setState({
                Yylist: filterData,
            })

        })
    }
    dataRefresh = (key) => {
        //切换当面面板

        this.setState({
            activeIndex: key
        })
    }
    getdata() {
        let payload = {
            userId: localStorage.getItem("usersid")
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/mineOrderList",
                resolve,
                reject,
                payload
            })
        }).then((res) => {
           
            // var data = [];
            // let s = _.map(res.data.data.orderinfo, "serviceInfo")
            // s.map(function (value, index, array) {
            //     data = data.concat(value);
            // });
            // console.log(data)
            this.setState({
                list: res.data.data.serviceInfo,
                id: res.data.data.yyid
            },()=>{
                this.getuserDetail(res.data.data.yyid)
            })

        })
    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey={this.state.activeIndex} activeKey={this.state.activeIndex} onChange={(key) => this.dataRefresh(key)} type="card">
                    <TabPane tab="我的个人信息" key="1">
                        <Table
                            rowKey={(item) => item._id}
                            dataSource={this.state.list} columns={this.state.columns} />
                    </TabPane>
                    <TabPane tab="查看我的预约" key="2">
                        <Table dataSource={this.state.Yylist} columns={this.state.YyDetailcolumns} />}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(index);
