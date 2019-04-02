import React, { Component } from 'react'
import '../stypes/LocalizationPanel.css'
import LocationChart from './LocationChart'

class LocalizationPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
          screenWidth: 1000,
          screenHeight: 430,
        }
    }

    onResize = () => {
      this.setState({
        screenWidth: window.innerWidth*0.56,
        screenHeight: window.innerHeight*0.95,
      })
    }

    componentWillMount(){
      window.addEventListener('resize', this.onResize, false)
      this.onResize()
    }

    render(){
        console.log("localization load!")
        return(
            <div className="LocalizationPanel">
              <LocationChart
                screenWidth={this.state.screenWidth}
                screenHeight={this.state.screenHeight}
              />
            </div>
        )
    }
}

export default LocalizationPanel;