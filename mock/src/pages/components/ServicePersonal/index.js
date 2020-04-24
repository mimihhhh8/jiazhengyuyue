import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Switch, Modal, Tooltip, Drawer,Card,message } from 'antd';
import { DiffFilled, DeleteOutlined,LikeTwoTone ,SettingTwoTone} from "@ant-design/icons";
import _ from "lodash"
class index extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            list: [],
            searchValue:"",
            Yylist: [],
            pingjia:[],
            visible: false,
            pingjiavisible:false,
            Detailvisible: false,
            YyDetailvisible: false,
            record: "",
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
                    title: '姓名',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: '用户ID',
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
                    render:(t,record)=>{
                        console.log(record.status)
                        return (
                            <div>
                                {
                                    record.status?t:"未预约不显示时间哦"
                                }
                            </div>
                        )
                    }
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (t, record) => {
                        return (
                            <div>
                                {t ?
                                    <Tooltip title="查看预约详情">
                                        <span onClick={() => this.handleRecord(record.yyid)}>已预约</span>
                                    </Tooltip>

                                    :
                                    "未预约"}
                            </div>
                        )

                    }
                },
                {
                    title: '修改权限',
                    dataIndex: 'Jurisdiction',
                    key: 'Jurisdiction',
                    //render: (text, record, index) => {}
                    //参数分别为当前行的值，当前行数据，行索引
                    render: (text, record, dataIndex) => {
                        return (
                            <div>
                                
                                    <Switch
                                        
                                        checkedChildren='true'
                                        unCheckedChildren="false"
                                        defaultChecked={text}
                                        onChange={() => this.onChange(text, record._id)} key={index} />
                                
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
                                <Tooltip title="查看服务类型">
                                    <DiffFilled style={{ width: '20px' }}
                                        onClick={() => this.handleRecord(record)}
                                    >

                                    </DiffFilled>
                                </Tooltip>
                                <Tooltip title="查看评价">
                                    <LikeTwoTone style={{ width: '20px' }}
                                        onClick={() => this.handlepingjia(record)}
                                    >
{/* <SettingTwoTone /> */}
                                    </LikeTwoTone>
                                </Tooltip>
                                <Tooltip title="一键重置密码">
                                    <SettingTwoTone style={{ width: '20px' }}
                                        onClick={() => this.handlereset(record._id)}
                                    >

                                    </SettingTwoTone>
                                </Tooltip>
                                <Tooltip title="删除">
                                    <DeleteOutlined onClick={() => this.hanndleDelete(record)} />
                                </Tooltip>

                            </div>

                        )
                },
            ]
        }
    }
    handlereset(id){
        let payload = {
            id,
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "user/resetpassword",
                resolve,
                reject,
                payload,
            })
        }).then((res) => {
           alert(res.info)
        })
    }
    onChange(value, id, record) {
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
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/updateJurisdiction",
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
    handlepingjia(record){
        this.setState({
            pingjiavisible:true,
            pingjia:record.pingjia
        })
    }
    render() {
        return (
            <div>
                <Table rowKey={(item) => item._id}
                    columns={this.state.columns} dataSource={this.state.list} />
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>你确定要删除该人员信息吗？</p>
                </Modal>
                <Modal
                        title="评价"
                        visible={this.state.pingjiavisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Card bordered={false} style={{ width: 350 }}>
                            {
                                this.state.pingjia.map((item,index)=>(
                                <p key={index}>({index+1}){item}</p>
                                ))
                            }
                         
                        </Card>
                    </Modal>
                {/* 详情抽屉 */}
                <Drawer
                    title="服务类型"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose.bind(this)}
                    visible={this.state.Detailvisible}
                    style={{ position: "absolute", overflow: "auto" }}
                    bodyStyle={{ height: '400px', overflow: 'auto' }}
                    height={400}
                >
                    {this.state.recordLength === 0 ? <span>该用户还未完善信息</span> : <Table dataSource={this.state.record} columns={this.state.Detailcolumns} />}
                </Drawer>
                <Drawer
                    title="预约详情"
                    placement="bottom"
                    closable={false}
                    onClose={this.onClose.bind(this)}
                    visible={this.state.YyDetailvisible}
                    style={{ position: "absolute", overflow: "auto" }}
                    bodyStyle={{ height: '400px', overflow: 'auto' }}
                    height={400}
                >
                   <Table dataSource={this.state.Yylist} columns={this.state.YyDetailcolumns}/>}
                </Drawer>
            </div>
        )
    }
    onClose = () => {
        this.setState({
            Detailvisible: false,
            YyDetailvisible:false
        })
    }
    componentDidMount() {
        this.renderList()

    }
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
                payload,
            })
        }).then((data) => {
            let filterData = _.filter(data.data, e => e.userstatus == 'unadmin')
            this.setState({
                list: filterData,
            })
            console.log(filterData)

        })
    }
    hanndleDelete(record) {
        this.setState({
            visible: true,
            id: record._id
        });

    }
    getuserDetail(record) {
        let payload = {
            searchValue:""
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                //dispatch触发l一个action
                //user是命名空间（models中），login是user下面的方法
                type: "user/userInfoList",
                resolve,
                reject,
                payload,
            })
        }).then((data) => {
            let filterData = _.filter(data.data, e => e._id === record)
            this.setState({
                Yylist: filterData,
                YyDetailvisible:true
            })
            console.log(filterData)

        })
    }
    handleRecord(record) {
        console.log(record.serviceInfo)
        if(record.serviceInfo===undefined){
            this.getuserDetail(record)
        }else{
            this.setState({
                recordLength: record.serviceInfo.length,
                record: record.serviceInfo,
                Detailvisible: true
            })
        }
        
    }
    handleOk = e => {
        this.setState({
            visible: false,
            pingjiavisible:false
        });
        let id = this.state.id
        let payload = {
            id
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/deleteWorkerInfo",
                resolve,
                reject,
                payload,
            })
        }).then((res) => {
            this.renderList()
        })
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            pingjiavisible:false
        });
    };
}


//映射
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(index);
// connect方法用来连接models层的state数据，参数常用的有2个，是第一个mapStateToProps，第二个mapDispatchToProps
// mapStateToProps按字面意思：把models层state数据变为组件的props
// mapDispatchToProps：用了此方法，dispatch只会在此方法里。不写该参数，dispatch会作为组件的props。(我平常用几乎不写该方法)
// export default connect(mapStateToProps, mapDispatchToProps)(TestPage);