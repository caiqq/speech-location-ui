import React, { Component } from 'react'
import '../stypes/MainBody.css'
import {Row, Col } from 'antd'
import 'antd/dist/antd.css';
import DataPanel from './DataPanel';
import LocalizationPanel from './LocalizationPanel'

class MainBody extends Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
    }

    render(){
        const statesAll = this.props.stateAll;
        const time = this.props.stateTime.time;
        console.log("mainbody render!")
        return(
            <Row type="flex" justify="start">
                <Col span={14}>
                    <LocalizationPanel stateAll={statesAll} times={time}></LocalizationPanel>
                </Col>
                <Col span={10}>
                    <DataPanel stateAll={statesAll} times={time}></DataPanel>                    
                </Col>
            </Row>
        )
    }
}

export default MainBody;