import React, { Component } from 'react'
import '../stypes/MainBody.css'
import {Row, Col } from 'antd'
import 'antd/dist/antd.css';
import DataPanel from './DataPanel';
import LocalizationPanel from './LocalizationPanel'

class MainBody extends Component {
    render(){
        const statesAll = this.props.stateAll;
        console.log("mainbody render!")
        return(
            <Row type="flex" justify="start">
                <Col span={14}>
                    <LocalizationPanel stateAll={statesAll}></LocalizationPanel>
                </Col>
                <Col span={10}>
                    <DataPanel stateAll={statesAll}></DataPanel>                    
                </Col>
            </Row>
        )
    }
}

export default MainBody;