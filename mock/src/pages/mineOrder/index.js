import React, { Component } from 'react'
import { connect } from 'dva';
import { Table, Button, Modal, Input } from 'antd';

import _ from "lodash";
import moment from "moment"
const { TextArea } = Input;
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,//控制模态框的出现及隐藏
            list: [],
            value: "",
            yytime: '',
            yuyuetime: "",
            hours: "",
            char: "",
            okID: "",
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
                    dataIndex: 'statues',
                    key: 'statues',
                    //render: (text, record, index) => {}
                    //参数分别为当前行的值，当前行数据，行索引
                    render: (text, record) => {
                        return text === undefined ? "" : <Button>正在服务</Button>

                    }
                },
                {
                    title: '操作',
                    dataIndex: 'delete',
                    key: 'delete',
                    render: (text, record) => {
                        return (
                            <div>
                                {
                                    text === undefined ? <Button onClick={() => this.showModal(record._id,record, record.char)}>结束预约</Button> : ""
                                }

                            </div>
                        )
                    }
                },
            ]
        }
    }
    handleOk = e => {
        console.log(e)
        this.setState({
            visible: false,
        }, () => {
            this.cancleOrder(e)
        });
    };
    onChange(e) {
        this.setState({
            value:e.target.value
        })
    }
    showModal = (record,s, char) => {
console.log(s)
        this.getuserDetail(record, char)
        this.setState({
            visible: true,
            okID: record
        });

    };
    getuserDetail(record, char) {
        let userId = record
        let payload = {
            userId
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/mineOrderList",
                resolve,
                reject,
                payload
            })
        }).then((data) => {
            console.log(data.data.data)
            let nowTime = moment().format('YYYY-MM-DD HH:mm')
            let s = moment(nowTime).valueOf() - moment(data.data.data.yytime).valueOf()
            var d = moment.duration(s, 'milliseconds');
            var hours = Math.floor(d.asHours());
            var mins = Math.floor(d.asMinutes()) - hours * 60;
            let yytime = hours + "小时" + mins + "分钟"
            this.setState({
                hours: hours + 1,
                yytime,
                yuyuetime: data.data.data.yytime,
                char: char
            })
        })
    }
    cancleOrder(workerId) {
        let flag = false
        let id = workerId
        let payload = {
            flag,
            id,
            userId: localStorage.getItem("usersid"),
            value:this.state.value
        }
        console.log(payload)
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/cancleOrder",
                resolve,
                reject,
                payload,
            })
        }).then((res) => {
            this.getOrderDetail()
        })
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                <Table rowKey={(record, index) => `complete${record.id}${index}`}
                    columns={this.state.columns} dataSource={this.state.list} />


                <Modal
                    title="结束预约并付费"
                    visible={this.state.visible}
                    onOk={() => this.handleOk(this.state.okID)}
                    onCancel={this.handleCancel}
                >
                    <p>预约时间:{this.state.yuyuetime}</p>
                    <p>结束时间:{moment().format('YYYY-MM-DD HH:mm')}</p>
                    <p> 服务时长:{this.state.yytime}</p>
                    <p>该员工计费方式:{this.state.char}元/小时</p>
                    <p> 应结算费用:<span style={{ color: "red" }}>{this.state.hours * this.state.char}￥</span>(不满一小时按一小时计算)</p>
                    <p>评价：</p>
                    <TextArea
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        placeholder="Controlled autosize"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        this.getOrderDetail()
    }
    //获取订单详情
    getOrderDetail() {
        let userId = localStorage.getItem("usersid")
        let payload = {
            userId
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/mineOrderList",
                resolve,
                reject,
                payload
            })
        }).then((res) => {
            console.log(res)
            var data = [];
            let s = _.map(res.data.data.orderinfo, "serviceInfo")
            s.map(function (value, index, array) {
                data = data.concat(value);
            });
            data.shift()
            this.setState({
                list: data
            })

        })
    }
    // 点击取消预约，将服务人员信息中的statues改为true

}
//映射的model里的
function mapStateToProps(state) {
    return {
        ...state
    }

}
export default connect(mapStateToProps)(index)