import React, { Component } from 'react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Label
  } from "bizcharts"

class DotChart extends Component{
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
        var datas = []
        var datasAll = props.conv
        if(datasAll.length > 0){
            for(var row=0; row < datasAll[this.state.times].length; row++){
                for(var col=0; col < datasAll[this.state.times][row].length; col++){
                    if(datasAll[this.state.times][row][col] === 1){
                        datas.push({"time": col, "neuron": row})
                    }
                }
            }
        }
        
        return datas
    }
    render(){
        // var data = [{"height": 10, "weight": 10}, {"height": 5, "weight": 10}, {"height": 3, "weight": 3}]
        var data = this.state.dot_data
        var title = this.state.title
        return(
            <div>
                <Chart height={window.innerHeight / 5} data={data} padding={{ top: 20, right: 10, bottom: 20, left: 30 }} forceFit>
                    <Tooltip
                        showTitle={false}
                        crosshairs={{
                        type: "cross"
                        }}
                        itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
                    />
                    {/* <Axis name="time" />
                    <Axis name="neuron" /> */}
                    <Geom
                        type="point"
                        position="time*neuron"
                        opacity={0.65}
                        shape="circle"
                        size={2}
                        tooltip={[
                        "gender*time*neuron",
                        (gender, time, neuron) => {
                            return {
                            name: gender,
                            value: time +" "+ neuron
                            };
                        }
                        ]}>                       
                        </Geom>
                </Chart>
                <div>{title}</div>
            </div>
        );
    }
}

export default DotChart;