import React, { Component } from 'react';
// import createPlotlyComponent from 'react-plotlyjs';
// import Plot from 'react-plotly.js';
import echarts from 'echarts/lib/echarts'
import { Recharts, Components } from 'react-component-echarts'
import datas from '../data.json'
const { XAxis, YAxis, Series } = Components


class PlotlyDotChart extends Component {

    constructor(props){
        super(props)
    }

    getrandom(num , mul) 
	{
        var value = [ ];
        for(var i=0;i<=num;i++)
        {
            var rand = Math.random() * mul;
            value.push(rand);
        }
        return value;
    }

    render() {
        console.log(datas)
        var data = datas
        
        var symbolSize = 2.5;
        var option = {
            grid3D: {},
            xAxis3D: {
                type: 'category'
            },
            yAxis3D: {},
            zAxis3D: {},
            dataset: {
                dimensions: [
                    'Income',
                    'Life Expectancy',
                    'Population',
                    'Country',
                    {name: 'Year', type: 'ordinal'}
                ],
                source: data
            },
            series: [
                {
                    type: 'scatter3D',
                    symbolSize: symbolSize,
                    encode: {
                        x: 'Country',
                        y: 'Life Expectancy',
                        z: 'Income',
                        tooltip: [0, 1, 2, 3, 4]
                    }
                }
            ]
        };
        return (
            <Recharts option={option}>
                {/* <YAxis type="value" />
                <XAxis type="category" data={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} />
                <Series data={[820,932,901,934,1290,1330,1320]} type="line" smooth={true} /> */}
            </Recharts>
            // <PlotlyComponent className="whatever" data={data} layout={layout} config={config} />
            // <Plot data={data} layout={layout} config={config}></Plot>
        )
    }
}

export default PlotlyDotChart