import React, { Component } from 'react';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
  } from "bizcharts"

class DotChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            dot_data: [],
            times: props.times,
        }
    }
    componentWillReceiveProps(nextProps){
        var dataAll = this.createDatas(nextProps)
        this.setState({
            dot_data: dataAll,
            times: nextProps.times,
        })
    }

    createDatas(datas){
        var datasAll = []
        for(var i in datasAll[this.state.times]){

        }
        return datasAll
    }
    render(){
        var data = [{"height": 10, "weight": 10}, {"height": 5, "weight": 10}, {"height": 3, "weight": 3}]
        return(
            <div>
                <Chart height={window.innerHeight / 3} data={data} forceFit>
                    <Tooltip
                        showTitle={false}
                        crosshairs={{
                        type: "cross"
                        }}
                        itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
                    />
                    <Axis name="height" />
                    <Axis name="weight" />
                    <Geom
                        type="point"
                        position="height*weight"
                        opacity={0.65}
                        shape="circle"
                        size={4}
                        tooltip={[
                        "gender*height*weight",
                        (gender, height, weight) => {
                            return {
                            name: gender,
                            value: height + "(cm), " + weight + "(kg)"
                            };
                        }
                        ]}
                    />
                </Chart>
            </div>
        );
    }
}

export default DotChart;