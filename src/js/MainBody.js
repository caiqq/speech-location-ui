import React, { Component } from 'react'
import '../stypes/MainBody.css'
import {Row, Col } from 'antd'
import 'antd/dist/antd.css';
import DataPanel from './DataPanel';
import LocalizationPanel from './LocalizationPanel'

class MainBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            times: 8
        }
    }

    subTimesState = () => {
        if(this.state.times > 1){
            this.setState({
                times: this.state.times - 1
            })
        }
    }

    addTimesState = () => {
        if(this.state.times < 10){
            this.setState({
                times: this.state.times + 1
            })
        }
    }

    render(){
        const statesAll = this.props.stateAll;
        console.log("mainbody render!")
        return(
            <Row type="flex" justify="start">
                <Col span={14}>
                    <LocalizationPanel stateAll={statesAll} times={this.state.times} addTimesState={this.addTimesState} subTimesState={this.subTimesState}></LocalizationPanel>
                </Col>
                <Col span={10}>
                    <DataPanel stateAll={statesAll} times={this.state.times}></DataPanel>                    
                </Col>
            </Row>
        )
    }
}

export default MainBody;