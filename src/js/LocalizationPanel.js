import React, { Component } from 'react'
import '../stypes/LocalizationPanel.css'
import LocationChart from './LocationChart'
import {Row, Col, Button } from 'antd';
import Papa from 'papaparse'
import {fetchUploadProject, fetchEvalutionProject} from '../utils/fetchs'
import store from '../store/configStore'
import configure from '../config.json'

class LocalizationPanel extends Component {
    constructor(props){
        super(props)
        this.inputFilePath = React.createRef()
        this.state = {
          screenWidth: 1000,
          screenHeight: 430,
        }
    }

    onResize = () => {
      this.setState({
        screenWidth: window.innerWidth*0.56,
        screenHeight: window.innerHeight*0.9,
      })
    }

    componentWillMount(){
      window.addEventListener('resize', this.onResize, false)
      this.onResize()
    }

    parseUploadData=(result)=>{
      Papa.parse(result, {
        complete: (result) => {
          this.handleUploadData(result.data)
        }
      })
    }
    
    onEvalutionClick = (e) => {
      console.log("on evalution!")
      // this.props.updateOpenState(false);
      
      const filePath = this.inputFilePath.current.files[0]
      let fileName = filePath.name.split('.')[0]
      console.log("file path:", fileName)

      fetchEvalutionProject(fileName, (text) => {
        try{         
          store.dispatch({
            type: configure.action.evalution,
            conv1: text.conv1,
            conv2: text.conv2,
            conv3: text.conv3,
            conv4: text.conv4,
            out_prob: text.outProb,
            max_out: text.maxOut
          })
        }catch(error){
          console.log("load project JSON parse error")
          console.log(error)
        }
      })
    }

    onUploadClick = (e) => {
      console.log("on upload!")
      const filePath = this.inputFilePath.current.files[0]
      let fileName = filePath.name.split('.')[0]

      fetchUploadProject(fileName, (text) => {
        try{
          console.log("upload data: ", text)
          store.dispatch({
            type: configure.action.upload,
            target: text.location
          })

        }catch(error){
          console.log("load project JSON parse error")
          console.log(error)
        }
      })
    }
 
    render(){
      console.log("localization render!")
      
      const stateAll = this.props.stateAll
      console.log(stateAll)
      return(
          <div className="LocalizationPanel">
            <LocationChart
              screenWidth={this.state.screenWidth}
              screenHeight={this.state.screenHeight}
              stateAll = {stateAll}
            />
            <Row type="flex" justify="space-around">
              <Col span={4}>
                <input type="file" ref={this.inputFilePath} className="uploadInput"></input>
              </Col>
              <Col span={4}><Button type="primary" className="localizationBtn" onClick={this.onUploadClick}>Upload</Button></Col>
              <Col span={4}><Button type="primary" className="localizationBtn" onClick={this.onEvalutionClick}>Evalution</Button></Col>
            </Row>             
          </div>
      )
    }
}

export default LocalizationPanel;