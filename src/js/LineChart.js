import React, { Component } from 'react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip
  } from "bizcharts";

class LineChart extends Component{

    constructor(props){
        super(props)
        this.state = {
            props_data: [],
            title: "",
        }
    }
    componentWillReceiveProps(nextProps){
        var dataAll = this.createDatas(nextProps)
        this.setState({
            props_data: dataAll,
            title: nextProps.title
        })
    }

    createDatas(props){
        var datas = []
        var datasAll = props.out_prob
        if(datasAll.length > 0){
            for(var row=0; row < datasAll.length; row++){                
                datas.push({"angle": row, "prop": datasAll[row]}) 
            }
        }
        
        return datas
    }

    render() {
        const data = this.state.props_data
        var title = this.state.title
        const cols = {
            angle: {
                alias: "angle"
            },
            prop: {
                alias: "prop"
            }
        };
        return (
          <div>
            <Chart height={window.innerHeight / 5} data={data} scale={cols} padding={{ top: 20, right: 10, bottom: 20, left: 30 }} forceFit>
              <Axis
                name="angle"
                title={null}
                tickLine={null}
                line={{
                  stroke: "#E6E6E6"
                }}
              />
              <Axis
                name="prop"
                line={false}
                tickLine={null}
                grid={null}
                title={null}
              />
              <Tooltip />
              <Geom
                type="line"
                position="angle*prop"
                size={1}
                shape="smooth"
                // style={{
                //   shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                //   shadowBlur: 60,
                //   shadowOffsetY: 6
                // }}
              />
            </Chart>
            <div>{title}</div>
          </div>
        );
    }

}

export default LineChart;
