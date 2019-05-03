import React, { Component } from 'react';
import '../stypes/DataPanel.css';
import DotChart from './DotChart';
import PlotlyDotChart from './PlotlyDotChart'
import LineChart from './LineChart';
import {Row, Col, Button, Icon } from 'antd';

class DataPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            times: 0
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            times: nextProps.times,
        })
    }

    render(){
        const stateAll = this.props.stateAll
        console.log("datapanel render!")
        const conv1 = stateAll.conv1
        const conv2 = stateAll.conv2
        const conv3 = stateAll.conv3
        const conv4 = stateAll.conv4
        const out_prob = stateAll.out_prob

        var title1 = "layer1"
        var title2 = "layer2"
        var title3 = "layer3"
        var title4 = "layer4"
        var title5 = "probablity"
        return(
            <div className="DataPanel">
                <Row>
                    <Col>
                        {/* <DotChart conv={conv1} times={this.state.times} title={title1}></DotChart> */}
                        {/* <myDiv></myDiv> */}
                        <PlotlyDotChart conv={conv1} times={this.state.times} title={title1}></PlotlyDotChart>
                    </Col>                    
                </Row>
                <Row>
                    <Col>
                        <DotChart conv={conv2} times={this.state.times} title={title2}></DotChart>
                    </Col>                    
                </Row>
                <Row>
                    <Col span={14}>
                        <DotChart conv={conv3} times={this.state.times} title={title3}></DotChart>
                    </Col>  
                    <Col span={8}>
                        <DotChart conv={conv4} times={this.state.times} title={title4}></DotChart>
                    </Col>                   
                </Row>
                <Row>
                    <Col>
                        <LineChart out_prob={out_prob} title={title5}></LineChart>
                    </Col>                    
                </Row>
                
            </div>
        )
    }
}

export default DataPanel;