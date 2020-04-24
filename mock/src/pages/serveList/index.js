import React, { Component } from 'react'
import { connect } from 'dva';
import _ from "lodash"
import { Update } from './styled.js';
import { Table, Switch, message, Row, Col, Button, Modal, Card, Form, Input, Tooltip, Drawer } from 'antd';
import { MessageTwoTone, DiffTwoTone } from "@ant-design/icons";
import moment from "moment"
//render  https://segmentfault.com/q/1010000020513212/
@Form.create()

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pingjia:[],
            flag: '',
            record: "",
            recordLength: '',
            Detailvisible: false,
            visible: false,//控制模态框的出现及隐藏
            Detailcolumns: [
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
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (text, record) => {
                        // console.log(text)
                    }
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
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    //render: (text, record, index) => {}
                    //参数分别为当前行的值，当前行数据，行索引
                    render: (text, record, dataIndex) => {
                        return (
                            <div>
                                {
                                    record.serviceInfo.length === 0 ? <span>当前用户未完善基本信息</span> : <Switch
                                        disabled={text}
                                        checkedChildren='已预约'
                                        unCheckedChildren="未预约"
                                        defaultChecked={text}
                                        onChange={() => this.onChange(text, record._id, record)} key={index} />
                                }
                            </div>
                        )
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'delete',
                    key: 'delete',
                    render: (text, record) =>
                        (
                            <div>
                                <Tooltip title="详情">
                                    <DiffTwoTone
                                        onClick={() => this.handleRecord(record)}
                                    />
                                </Tooltip>
                                <Tooltip title="查看评价">
                                    <MessageTwoTone
                                        onClick={()=>this.showModal(record)}
                                    />

                                </Tooltip>

                            </div>

                        )
                },
                // {
                //     title: '操作',
                //     dataIndex: 'operate',
                //     key: 'operate',
                //     render: (text, record) => (
                //         <Button type="primary" onClick={()=>this.showModal(record)}>修改</Button>
                //     ),
                // },
            ],
            searchValue: '',
            // 添加服务默认值
            workername: "",
            workeraddress: "",
            servicetype: "",
            task: "",
            statues: "false",
            experience: "",
            id: ''
        }
    }
 
    handleRecord(record) {
        if (record.serviceInfo.length === 0) {
            alert("该用户未完善基本信息 暂不支持查看")
        } else {
            this.setState({
                recordLength: record.serviceInfo.length,
                record: record.serviceInfo,
                Detailvisible: true
            })
        }

    }
    onClose = () => {
        this.setState({
            Detailvisible: false,
        })
    }
    onChange(value, id, record) {
        let userid = localStorage.getItem('usersid')
        var flag = ''
        if (value === true) {
            flag = false
        } else {
            flag = true
        }
        //修改数据库中的预约状态
        let payload = {
            flag,
            id,
            userid,
            record,
            yytime: moment().format('YYYY-MM-DD HH:mm')
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/updateStatues",
                resolve,
                reject,
                payload,
            })
        }).then((res) => {
            if (res.data.code === 200) {
                message.success(res.data.info);
            } else if (res.data.code === 200) {
                message.success(res.data.info);
            } else {
                message.error(res.data.info);
            }
            this.renderList()
        })

    }
    render() {
        const { Search } = Input;
        const style = { padding: '8px 0' };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {/* 搜索 */}
                <div style={{ padding: '20px 0' }}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>
                                <Search
                                    placeholder="根据姓名搜索"
                                    onSearch={this.handleValue.bind(this)}
                                    enterButton
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}></div>
                        </Col>
                    </Row>
                </div>
                {/* 表格 */}
                <Table rowKey={(item) => item._id}
                    columns={this.state.columns} dataSource={this.state.list} />

                <Drawer
                    title="详情"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose.bind(this)}
                    visible={this.state.Detailvisible}
                    style={{ position: "absolute", overflow: "auto" }}
                    bodyStyle={{ height: '400px', overflow: 'auto' }}
                    height={400}
                >
                    {this.state.recordLength === 0 ? <span>该用户还未完善信息 </span> : <Table dataSource={this.state.record} columns={this.state.Detailcolumns} />}
                </Drawer>

                {/* 修改服务信息的模态框 */}
                <div>
                    <Modal
                        title="评价"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Card bordered={false} style={{ width: 350 }}>
                            {
                                this.state.pingjia.map((item,index)=>(
                                <p key={index}>({index+1}){item}</p>
                                ))
                            }
                            
                            {/* <p>sds</p>
                            <p>sds</p>
                            <p>sds</p> */}
                        </Card>
                    </Modal>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.renderList()
    }
    // initweblist(value) {
    //     let payload = {
    //         searchValue: this.state.searchValue
    //     }
    //     new Promise((resolve, reject) => {
    //         this.props.dispatch({
    //             type: "service/serviceList",
    //             resolve,
    //             reject,
    //             payload
    //         })
    //     }).then((data) => {
    //         let filterData = _.filter(data.data, e => e.statues === false)
    //         this.setState({
    //             list: filterData
    //         })
    //     })
    // }
    renderList() {
        let payload = {
                    searchValue: this.state.searchValue
                }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                //dispatch触发l一个action
                //user是命名空间（models中），login是user下面的方法
                type: "user/userInfoList",
                resolve,
                reject,
                payload
            })
        }).then((data) => {
            let filterData = _.filter(data.data, e => e.userstatus === 'unadmin')
            this.setState({
                list: filterData
            })

        })
    }
    // 获得搜索框内的值()
    handleValue(value) {
        this.setState({
            searchValue: value
        }, function () {
            this.renderList();
        })
        //   
    }
    // 修改服务信息模态框操作
    showModal = (record) => {
        this.setState({
            visible: true,
            pingjia:record.pingjia
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

}
//映射的model里的
function mapStateToProps(state) {
    return {
        ...state
    }

}
export default connect(mapStateToProps)(index);