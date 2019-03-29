import React, { Component } from 'react'
import {Row, Col } from 'antd'
import 'antd/dist/antd.css';
import '../stypes/Header.css'

class NewHeader extends Component {
    render(){
        return(
            <header id="navbar">
                <Row className="pageHeader" type="flex" justify="start">
                    <Col span={5}>
                        <div> 
                            <img className="nusLogo" src={require('../image/nus_logo.png')}  alt="logo"/>
                            <font className="projectTitle">Sound localization</font>
                        </div>
                    </Col>
                    <Col span={19} className="col">
                    </Col>
                </Row>
                <Row>
                    <hr className="splitline"/>
                </Row>
            </header>
        )
    }
}

export default NewHeader;