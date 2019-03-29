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
        const statesAll = this.props.stateAll;
        return(
            <div id="MainWindow">
                <NewHeader title={configuration.titleName}></NewHeader>
                <MainBody></MainBody>
            </div>
        )
    }
}

export default MainWindow