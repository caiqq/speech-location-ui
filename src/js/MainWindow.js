import React, { Component } from 'react';
import '../stypes/MainWindow.css'
import NewHeader from './Header';
import MainBody from './MainBody'
import configuration from '../config.json'

class MainWindow extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        const statesAll = this.props.stateAll.project;
        const stateTime = this.props.stateAll.time;
        console.log("mainwindow render!")
        return(
            <div id="MainWindow">
                <NewHeader title={configuration.titleName}></NewHeader>
                <MainBody stateAll={statesAll} stateTime={stateTime}></MainBody>
            </div>
        )
    }
}

export default MainWindow