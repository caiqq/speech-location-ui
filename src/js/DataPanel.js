import React, { Component } from 'react';
import '../stypes/DataPanel.css';
import DotChart from './DotChart';
import D3DotChart from './D3DotChart'
import LineChart from './LineChart';
import {Row, Col} from 'antd';

class DataPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            screenWidth: 390,
            screenHeight: 260,
        }
    }

    componentWillMount(){
        window.addEventListener('resize', this.onResize, false)
        this.onResize()
    }

    componentWillReceiveProps(nextProps){
        this.onResize()
    }

    onResize = () => {
        this.setState({
            screenWidth: window.innerWidth*0.40,
            screenHeight: window.innerHeight*0.18,
        })
    }

    render(){
        console.log("datapanel render!")
        const stateAll = this.props.stateAll
        const times = this.props.times
        
        // const conv1 = stateAll.conv1
        const conv1_1 = stateAll.conv1_1
        const conv2 = stateAll.conv2
        const conv3 = stateAll.conv3
        const conv4 = stateAll.conv4
        // const out_prob = stateAll.out_prob
        const out_prob_list = stateAll.out_prob_list

        var title1 = "layer1"
        var title2 = "layer2"
        var title3 = "layer3"
        var title4 = "layer4"
        var title5 = "probablity"

        return(
            <div className="DataPanel">
                <Row>
                    <Col>
                        {/* <PlotlyDotChart conv={conv1_1} times={times} title={title1}></PlotlyDotChart> */}
                        <D3DotChart conv={conv1_1} times={times} title={title1} screenWidth={this.state.screenWidth}
                            screenHeight={this.state.screenHeight}></D3DotChart>
                    </Col>                    
                </Row>
                <Row>
                    <Col>
                        <DotChart conv={conv2} times={times} title={title2}></DotChart>
                    </Col>                    
                </Row>
                <Row>
                    <Col span={14}>
                        <DotChart conv={conv3} times={times} title={title3}></DotChart>
                    </Col>  
                    <Col span={8}>
                        <DotChart conv={conv4} times={times} title={title4}></DotChart>
                    </Col>                   
                </Row>
                <Row>
                    <Col>
                        {/* <LineChart out_prob={out_prob} times={times} title={title5}></LineChart> */}
                        <LineChart out_prob_list={out_prob_list} times={times} title={title5}></LineChart>
                    </Col>                    
                </Row>
                
            </div>
        )
    }
}

export default DataPanel;