import React, { Component } from 'react';
import * as d3 from 'd3'; 
import { _3d } from './d3-3d_2'

class D3DotChart3 extends Component {
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
        this.setState({
            times: nextProps.times,
            title: nextProps.title,
        })
        if (nextProps.screenWidth !== this.props.screenWidth) {
            console.log("width changed!")
            this.updateNewModules(nextProps)
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

    createData = (Datas, props) => {
        var maxVal = 20
        var cnt = 0
        var xGridArray = []
        var scatter = []

        if(Datas.length > 0){
            var zMax = Datas[props.times-1].length
            var yMax = Datas[props.times-1][0].length
            var xMax = Datas[props.times-1][0][0].length
            if(zMax%2 !== 0){
                zMax += 1
            }
            if(yMax%2 !== 0){
                yMax += 1
            }
            if(xMax%2 !== 0){
                xMax += 1
            }
            // maxVal = Math.max(xMax, yMax, zMax)
            maxVal = zMax

            console.log("x: ", xMax)
            console.log("y: ", yMax)
            console.log("z: ", zMax)

            console.log("maxVal: ", maxVal)

            var mXMax = parseInt(xMax/2, 10)
            var mZMax = parseInt(zMax/2, 10)
            // for(var zIndex = -mZMax; zIndex < mZMax; zIndex++){
            //     for(var xIndex = -mXMax; xIndex < mXMax; xIndex++){               
            //         xGridArray.push([xIndex, 1, zIndex])                   
            //     }
            // }
            for(var xIndex = -mXMax; xIndex < mXMax; xIndex++){ 
                for(var zIndex = -mZMax; zIndex < mZMax; zIndex++){                              
                    xGridArray.push([zIndex, 1, xIndex])                   
                }
            }

            for(var z=0; z < Datas[props.times-1].length; z++){
                for(var row=0; row < Datas[props.times-1][z].length; row++){
                    for(var col=0; col < Datas[props.times-1][z][row].length; col++){
                        if(Datas[props.times-1][z][row][col] === 1){
                            scatter.push({x: z-mZMax, y: -row, z: col-mXMax, id: 'point_' + cnt++ })
                        }
                    }
                }
            } 
        }
        return [xGridArray, scatter, maxVal]
    }

    draw3dGraph = (props, svg) => {       
        // add data
        var graphData = this.createData(props.conv, props)
        var xGridArray = graphData[0]
        var scatter = graphData[1]
        var maxVal = graphData[2]

        var width = props.screenWidth
        var height = props.screenHeight

        var originWidth = width*0.5
        var originHeight = height*0.5

        var origin = [originWidth, originHeight], scale = maxVal*0.16, key = function (d) { return d.id; };
        var startAngle = Math.PI / 8
        
        // svg.append("circle").attr("full", "lightgrey").attr("r", 40)
        //     .attr("transform", "translate(" + 100 + "," + 100 + ")")
        
        svg.append('g')
            .attr("id", "dotchart2")

        // svg.append('g').attr("transform", "translate(" + transform_left + "," + 0 + ")");

        var grid3d = _3d()
            .shape('GRID', maxVal)
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

        var data = [
            grid3d(xGridArray),
            point3d(scatter),
        ];

        var tt = 1000
        var xGrid = svg.select('g#dotchart2').selectAll('path.grid').data(data[0], key);

        console.log("xGrid: ")
        console.log(xGrid)
        xGrid
            .enter()
            .append('path')
            .attr('class', '_3d grid')
            // .merge(xGrid)
            .attr('stroke', 'black')
            .attr('stroke-width', 0.3)
            .attr('fill', function (d) { return d.ccw ? 'lightgrey' : 'lightblue'; })
            .attr('fill-opacity', 0.9)
            .attr('d', grid3d.draw);

        xGrid.exit().remove();

        console.log("xGrid2: ")
        console.log(xGrid)

        /* ----------- POINTS ----------- */
        var points = svg.select('g#dotchart2').selectAll('circle').data(data[1], key);

        points
            .enter()
            .append('circle')
            .attr('class', '_3d')
            .attr('opacity', 0)
            .attr('cx', this.posPointX)
            .attr('cy', this.posPointY)
            // .merge(points)
            .transition().duration(tt)
            .attr('r', 3)
            .attr('fill', 'blue')
            // .attr('stroke', function (d) { return d3.color(color(d.id)).darker(3); })
            // .attr('fill', function (d) { return color(d.id); })
            .attr('opacity', 1)

        points.exit().remove();

        // d3.selectAll('._3d').sort(_3d().sort);
    }

    updateNewModules = (props) => {       
        var el = this.svgRef.current;

        var width = props.screenWidth
        var height = props.screenHeight

        var svg = d3.select(el).select("svg#chart2svg")
            .attr("width", width)
            .attr("height", height)

        svg.select("g").data([]).exit().remove()

        this.draw3dGraph(props, svg)
    }

    createDotGraph = (props) => {
        var el = this.svgRef.current;

        var width = props.screenWidth
        var height = props.screenHeight

        var svg = d3.select(el).append("svg")
            .attr("id", "chart2svg")
            .attr("width", width)
            .attr("height", height)
        this.draw3dGraph(props, svg)       
    }

    posPointX(d) {
        return d.projected.x;
    }

    posPointY(d) {
        return d.projected.y;
    }

    render() {
        console.log("D3 DotChart render!!!!!!")
        var title = ""
        if(this.props.conv.length > 0){
            title = this.props.title
            var z = this.props.conv[0].length
            var y = this.props.conv[0][0].length
            var x = this.props.conv[0][0][0].length
            title = title + " " + "shape(" + z + ", " + y + ", " + x +")"
        }
        return (
            <div id={"dot_chart_2"}>
                <div ref={this.svgRef} ></div>
                <div>{title}</div>
            </div>
            
        )
    }
}

export default D3DotChart3;