import React, { Component } from 'react';
import '../stypes/DataPanel.css';
import DotChart from './DotChart';

class DataPanel extends Component {
    render(){
        return(
            <div className="DataPanel">
                <DotChart></DotChart>
            </div>
        )
    }
}

export default DataPanel;