import React, { Component } from 'react';
import * as d3 from 'd3'; 
import { _3d } from 'd3-3d'

class D3DotChart extends Component {
    constructor(props) {
        super(props)
        this.svgRef = React.createRef()
        this.state = {
            dot_data: [],
            times: props.times,
            title: "",
            mx: 0,
            my: 0,
            mouseX: 0,
            mouseY: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        // var dataAll = this.createDatas(nextProps)
        this.setState({
            // dot_data: dataAll,
            times: nextProps.times,
            title: nextProps.title,
        })
        if (nextProps.screenWidth !== this.props.screenWidth) {
            console.log("width changed!")
            this.clearSVG()
            this.resizeChart(nextProps)
        } else {
            console.log("update changed!")
            this.updateNewModules(nextProps)
        }
    }

    componentDidMount() {
        this.createDotGraph(this.props)
    }

    resizeChart = (props) => {
        this.createDotGraph(props)
    }

    clearSVG(){
        var el = this.svgRef.current
        d3.select(el).select("svg").data([]).exit().remove()
    }

    updateNewModules = (props) => {
        var datasAll = props.conv
        var maxVal = 20
        if(datasAll.length > 0){
            var zMax = datasAll[props.times-1].length
            var yMax = datasAll[props.times-1][0].length
            var xMax = datasAll[props.times-1][0][0].length
            maxVal = Math.max(xMax, yMax, zMax)
        }
        var el = this.svgRef.current;

        var width = props.screenWidth
        var height = props.screenHeight

        var originWidth = width*0.8
        var originHeight = height*0.75
        var transform_left = -originWidth/2.4

        var radius = Math.max(originWidth, originHeight);
        
        var r = d3.scaleLinear()
            .domain([0, maxVal])
            .range([0, radius]);

        var svg = d3.select(el).select("svg")
            .attr("width", width)
            .attr("height", height)

        svg.select("g").data([]).exit().remove()

        var origin = [originWidth, originHeight], scale = maxVal, key = function (d) { return d.id; };
        var startAngle = Math.PI / 10

        svg.append('g').attr("transform", "translate(" + transform_left + "," + 0 + ")");
        // var color = ["#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2"]

        var grid3d = _3d()
            .shape('GRID', 20)
            .origin(origin)
            .rotateY(startAngle)
            .rotateX(-startAngle)
            .scale(scale);

        var point3d = _3d()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })
            .z(function (d) { return d.z; })
            .origin(origin)
            .rotateY(startAngle)
            .rotateX(-startAngle)
            .scale(scale);

        // add data
        var cnt = 0;
        var xGridArray = []
        var scatter = [];

        cnt = 0
        
        if(datasAll.length > 0){
            zMax = datasAll[props.times-1].length
            xMax = datasAll[props.times-1][0][0].length
            for(var zIndex = -zMax; zIndex < zMax; zIndex++){
                for(var xIndex = -xMax; xIndex < xMax; xIndex++){               
                    xGridArray.push([xIndex, 1, zIndex])                   
                }
            }
            for(var z=0; z < datasAll[props.times-1].length; z++){
                for(var row=0; row < datasAll[props.times-1][z].length; row++){
                    for(var col=0; col < datasAll[props.times-1][z][row].length; col++){
                        if(datasAll[props.times-1][z][row][col] === 1){
                            // xGridArray.push([col, 1, z])
                            scatter.push({x: col, y: row, z: z, id: 'point_' + cnt++ })
                        }
                    }
                }
            }            
        }

        var data = [
            grid3d(xGridArray),
            point3d(scatter),
            // yScale3d([yLine])
        ];

        var tt = 1000

        svg = d3.select(el).select('svg').select('g');
        var xGrid = svg.selectAll('path.grid').data(data[0], key);

        xGrid
            .enter()
            .append('path')
            .attr('class', '_3d grid')
            .merge(xGrid)
            .attr('stroke', 'black')
            .attr('stroke-width', 0.3)
            .attr('fill', function (d) { return d.ccw ? 'lightgrey' : '#717171'; })
            .attr('fill-opacity', 0.9)
            .attr('d', grid3d.draw);

        xGrid.exit().remove();

        /* ----------- POINTS ----------- */

        var points = svg.selectAll('circle').data(data[1], key);

        points
            .enter()
            .append('circle')
            .attr('class', '_3d')
            .attr('opacity', 0)
            .attr('cx', this.posPointX)
            .attr('cy', this.posPointY)
            .merge(points)
            .transition().duration(tt)
            .attr('r', 3)
            // .attr('stroke', function (d) { return d3.color(color(d.id)).darker(3); })
            // .attr('fill', function (d) { return color(d.id); })
            .attr('opacity', 1)

        points.exit().remove();

        d3.selectAll('._3d').sort(_3d().sort);
    }

    createDotGraph = (props) => {

        var datasAll = props.conv
        var maxVal = 20
        if(datasAll.length > 0){
            var zMax = datasAll[props.times-1].length
            var yMax = datasAll[props.times-1][0].length
            var xMax = datasAll[props.times-1][0][0].length
            maxVal = Math.max(xMax, yMax, zMax)
        }

        var el = this.svgRef.current;

        var width = props.screenWidth
        var height = props.screenHeight

        var originWidth = width*0.8
        var originHeight = height*0.75
        var transform_left = -originWidth/2.4

        var radius = Math.max(originWidth, originHeight);

        var r = d3.scaleLinear()
            .domain([0, maxVal])
            .range([0, radius]);

        var svg = d3.select(el).append("svg")
            .attr("width", width)
            .attr("height", height)

        var origin = [originWidth, originHeight], scale = maxVal, key = function (d) { return d.id; };
        var startAngle = Math.PI / 10

        svg.append('g').attr("transform", "translate(" + transform_left + "," + 0 + ")");
        // var color = ["#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2"]

        var grid3d = _3d()
            .shape('GRID', 20)
            .origin(origin)
            .rotateY(startAngle)
            .rotateX(-startAngle)
            .scale(scale);

        var point3d = _3d()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })
            .z(function (d) { return d.z; })
            .origin(origin)
            .rotateY(startAngle)
            .rotateX(-startAngle)
            .scale(scale);

        // add data
        var cnt = 0;
        var xGridArray = []
        var scatter = [];
        
        if(datasAll.length > 0){
            zMax = datasAll[props.times-1].length
            xMax = datasAll[props.times-1][0][0].length
            for(var zIndex = -zMax; zIndex < zMax; zIndex++){
                for(var xIndex = -xMax; xIndex < xMax; xIndex++){                
                    xGridArray.push([xIndex, 1, zIndex])
                    // scatter.push({x: xIndex, y: d3.randomUniform(0, -10)(), z: zIndex, id: 'point_' + cnt++ })
                }
            }
            for(var z=0; z < datasAll[props.times-1].length; z++){
                for(var row=0; row < datasAll[props.times-1][z].length; row++){
                    for(var col=0; col < datasAll[props.times-1][z][row].length; col++){
                        if(datasAll[props.times-1][z][row][col] === 1){
                            // xGridArray.push([col, 1, z])
                            scatter.push({x: col, y: row, z: z, id: 'point_' + cnt++ })
                        }
                    }
                }
            }            
        }

        var data = [
            grid3d(xGridArray),
            point3d(scatter),
            // yScale3d([yLine])
        ];

        var tt = 1000

        svg = d3.select(el).select('svg').select('g');
        var xGrid = svg.selectAll('path.grid').data(data[0], key);

        xGrid
            .enter()
            .append('path')
            .attr('class', '_3d grid')
            .merge(xGrid)
            .attr('stroke', 'black')
            .attr('stroke-width', 0.3)
            .attr('fill', function (d) { return d.ccw ? 'lightgrey' : '#717171'; })
            .attr('fill-opacity', 0.9)
            .attr('d', grid3d.draw);

        xGrid.exit().remove();

        /* ----------- POINTS ----------- */

        var points = svg.selectAll('circle').data(data[1], key);

        points
            .enter()
            .append('circle')
            .attr('class', '_3d')
            .attr('opacity', 0)
            .attr('cx', this.posPointX)
            .attr('cy', this.posPointY)
            .merge(points)
            .transition().duration(tt)
            .attr('r', 3)
            // .attr('stroke', function (d) { return d3.color(color(d.id)).darker(3); })
            // .attr('fill', function (d) { return color(d.id); })
            .attr('opacity', 1)

        points.exit().remove();

        d3.selectAll('._3d').sort(_3d().sort);
    }


    posPointX(d) {
        return d.projected.x;
    }

    posPointY(d) {
        return d.projected.y;
    }

    render() {
        console.log("D3 DotChart render!!!!!!")
        return (
            <div ref={this.svgRef} ></div>
        )
    }
}

export default D3DotChart;