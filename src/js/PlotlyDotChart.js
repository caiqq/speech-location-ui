import React, { Component } from 'react';

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js-dist'

class PlotlyDotChart extends Component {

    constructor(props){
        super(props)
        this.state = {
            dot_data: [],
            times: props.times,
            title: "",
        }
    }
    
    componentWillReceiveProps(nextProps){
        var dataAll = this.createDatas(nextProps)
        this.setState({
            dot_data: dataAll,
            times: nextProps.times,
            title: nextProps.title,
        })
    }

    createDatas(props){
        var xIndex = []
        var yIndex = []
        var zIndex = []
        var datasAll = props.conv
        
        if(datasAll.length > 0){
            for(var z=0; z < datasAll[props.times-1].length; z++){
                for(var row=0; row < datasAll[props.times-1][z].length; row++){
                    for(var col=0; col < datasAll[props.times-1][z][row].length; col++){
                        if(datasAll[props.times-1][z][row][col] === 1){
                            zIndex.push(z)
                            yIndex.push(row)
                            xIndex.push(col)
                        }
                    }
                }
            }            
        }

        var datas = [{
            x: xIndex,
            y: yIndex,
            z: zIndex,
            mode: 'markers',
            type: 'scatter3d',
            marker: {
              color: 'rgb(23, 190, 207)',
              size: 2
            }
        },{
            alphahull: 7,
            opacity: 0.1,
            type: 'mesh3d',
            x: xIndex,
            y: yIndex,
            z: zIndex
        }];
        
        return datas
    }

    render() {
        console.log("plotly Dot Chart render: ")
        const PlotlyComponent = createPlotlyComponent(Plotly);
        var data = this.state.dot_data

        var maxX = 1
        var maxY = 1
        var maxZ = 1
        if(this.props.conv.length > 0){
            maxX = this.props.conv[0][0][0].length
            maxY = this.props.conv[0][0].length
            maxZ = this.props.conv[0].length
        }

        var layout = {
            autosize: true,
            height: window.innerHeight / 5,
            width: window.innerWidth/3
        };
        return (
            <PlotlyComponent className="whatever" data={data} layout={layout}/>
        )
    }
}

export default PlotlyDotChart