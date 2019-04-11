import React, { Component } from 'react';
import '../stypes/DataPanel.css';
import DotChart from './DotChart';
import {Row, Col, Button, Icon } from 'antd';

class DataPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            times: 0
        }
    }


    render(){
        const ButtonGroup = Button.Group;
        const stateAll = this.props.stateAll
        var newTime = "Time: " + this.state.times
        console.log("datapanel render!")
        const conv1 = stateAll.conv1
        return(
            <div className="DataPanel">
                <Row>
                    <Col span={4}>
                        <ButtonGroup>
                            <Button>
                                <Icon type="left" />
                            </Button>
                            <Button>
                                <Icon type="right" />
                            </Button>
                        </ButtonGroup>
                    </Col>
                    <Col span={4}>{newTime}</Col>
                </Row>
                
                <DotChart states1={conv1} times={this.state.times}></DotChart>
            </div>
        )
    }
}

export default DataPanel;