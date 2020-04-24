import React, { Component } from 'react';
import { connect } from 'dva';
import {Tabs } from 'antd';
import ServedPersonnel from '../components/ServedPersonnel'
import ServicePersonal from '../components/ServicePersonal'
import Admin from "../components/admin"
const { TabPane } = Tabs;

class index extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: "1",
        }
    }
    // componentWillMount(){
    //     if(localStorage.getItem("userstatus")==="superadmin"){

    //     }else{
    //         alert("D")
    //     }
    // }
    dataRefresh = (key) => {
        //切换当面面板
        this.setState({
            activeIndex: key
        })
    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey={this.state.activeIndex} activeKey={this.state.activeIndex} onChange={(key) => this.dataRefresh(key)} type="card">
                    <TabPane tab="被服务人员信息管理" key="1">
                        <ServedPersonnel />
                    </TabPane>
                    <TabPane tab="服务人员信息管理" key="2">
                        <ServicePersonal />
                    </TabPane>
                    <TabPane tab="管理人员信息管理" key="3">
                       <Admin></Admin>
                    </TabPane>
                </Tabs>,
            </div>
        )
    }
    componentDidMount() {
    }
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