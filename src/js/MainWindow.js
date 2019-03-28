import React, { Component } from 'react';
import '../stypes/MainWindow.css'

class MainWindow extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        const statesAll = this.props.stateAll;
        return(
            <div id="MainWindow">
                <div className="pageHeader"> 
                    <img className="nusLogo" src={require('../image/nus_logo.png')}  alt="logo"/>
                    <font className="projectTitle">Sound localization</font>
                </div>
                <body>
                    <h1>Hello world!</h1>
                </body>
            </div>
        )
    }
}

export default MainWindow