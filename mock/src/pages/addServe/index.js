import React, { Component } from 'react'
import { Card, Form, Input, Button, message, InputNumber } from 'antd';
import { Addserve } from './styled.js';
import { connect } from 'dva';
@Form.create()
class Addinfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            workername: "",
            workeraddress: "",
            servicetype: "",
            task: "",
            statues: "false",
            experience: "",
            id: '',
            list: "",
            char:""
        }
    }
    componentDidMount() {
        this.getuserDetail()
    }
    getuserDetail() {
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
        }).then((data) => {
            this.setState({
                list: data.data.data
            })

        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(this.state.list)
        return (
            <Addserve>
                {
                    typeof (this.state.list.serviceInfo) === 'undefined' ? null : <Card title="完善信息" bordered={false} style={{ width: 400 }}>
                        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                            <Form.Item label="员工姓名">
                                {
                                    getFieldDecorator('workername', {
                                        // rules: [{ message: 'Please input your note!' }],
                                    })(<Input type="text" disabled={true} placeholder={this.state.list.username} onChange={(e) => { this.setState({ workername: e.target.value }) }} />)
                                }
                            </Form.Item>
                            <Form.Item label="员工ID">
                                {
                                    getFieldDecorator('id', {
                                        // rules: [{ message: 'Please input your note!' }],
                                    })(<Input type="text" disabled={true} placeholder={this.state.list.loginid} />)
                                }
                            </Form.Item>
                            <Form.Item label="员工地址">
                                {
                                    getFieldDecorator('workeraddress', {
                                        rules: [{ message: 'Please input your note!' }],
                                    })(<Input
                                        disabled={this.state.list.serviceInfo.length===1? true : false}
                                        placeholder={this.state.list.serviceInfo.length===1? this.state.list.serviceInfo[0].workeraddress : null}
                                        type="text"
                                        onChange={(e) => { this.setState({ workeraddress: e.target.value }) }} />)
                                }
                            </Form.Item>
                            <Form.Item label="服务类型">
                                {
                                    getFieldDecorator('servicetype', {
                                        rules: [{ message: 'Please input your note!' }],
                                    })(<Input
                                        disabled={this.state.list.serviceInfo.length===1 ? true : false}
                                        placeholder={this.state.list.serviceInfo.length===1? this.state.list.serviceInfo[0].servicetype : null}
                                        type="text"
                                        onChange={(e) => { this.setState({ servicetype: e.target.value }) }} />)
                                }
                            </Form.Item>
                            <Form.Item label="任务">
                                {
                                    getFieldDecorator('task', {
                                        rules: [{ message: 'Please input your note!' }],
                                    })(<Input
                                        disabled={this.state.list.serviceInfo.length===1 ? true : false}
                                        placeholder={this.state.list.serviceInfo.length===1 ? this.state.list.serviceInfo[0].task : null}
                                        type="text" onChange={(e) => { this.setState({ task: e.target.value }) }} />)
                                }
                            </Form.Item>
                            <Form.Item label="工作年限">
                                {
                                    getFieldDecorator('experience', {
                                        rules: [{ message: 'Please input your note!' }],
                                    })(<Input
                                        disabled={this.state.list.serviceInfo.length===1 ? true : false}
                                        placeholder={this.state.list.serviceInfo.length===1 ? this.state.list.serviceInfo[0].experience : null}
                                        type="text" onChange={(e) => { this.setState({ experience: e.target.value }) }} />)
                                }
                            </Form.Item>
                            <Form.Item label="（小时/元）">
                                {
                                    getFieldDecorator('char', {
                                        rules: [{ message: 'Please input your note!' }],
                                    })(<Input
                                        disabled={this.state.list.serviceInfo.length===1 ? true : false}
                                        placeholder={this.state.list.serviceInfo.length===1 ? this.state.list.serviceInfo[0].char : null}
                                        type="text" onChange={(e) => { this.setState({ char: e.target.value }) }} />)
                                }
                            </Form.Item>
                        </Form>
                        {this.state.list.serviceInfo.length===1? <Button type="primary" className="center" disabled={true} >已完善</Button> : <Button type="primary" className="center" onClick={() => this.handleData()}>确定完善</Button>}
                    </Card>
                }

            </Addserve>

        )
    }
    handleData() {
        console.log(this.state.list)
        let { workeraddress, servicetype, task, statues, experience,char} = this.state;
        let id = localStorage.getItem("usersid");
        let payload = {
            workeraddress,
            servicetype,
            task,
            statues,
            experience,
            char,
            id,
            _id:this.state.list._id,
            username:this.state.list.username,
            registerTime:this.state.list.registerTime,
            name:this.state.list.name,
            loginid:this.state.list.loginid,
            phone:this.state.list.phone,
            age:this.state.list.age,
            sex:this.state.list.sex,
            detailaddress:this.state.list.detailaddress
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/serviceSave",
                resolve,
                reject,
                payload
            })
        }).then((data) => {
            console.log(data)
            if (data.code === 1) {
                message.success("完善成功")
            } else {
            }

        })
    }
}
//映射
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(Addinfo);
