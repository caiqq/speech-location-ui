import React, { Component } from 'react'
import '../stypes/MainBody.css'
import {Row, Col } from 'antd'
import 'antd/dist/antd.css';
import DataPanel from './DataPanel';
import LocalizationPanel from './LocalizationPanel'

class MainBody extends Component {
    render(){
        return(
            <Row type="flex" justify="start">
                <Col span={14}>
                    <DataPanel></DataPanel>
                </Col>
                <Col span={10}>
                    <LocalizationPanel></LocalizationPanel>
                </Col>
            </Row>
        )
    }
}

export default MainBody;