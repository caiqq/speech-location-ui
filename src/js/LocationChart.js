import React, { Component } from 'react';
import * as d3 from 'd3'
import '../stypes/LocationChart.css'
import configure from '../config.json';

class LocationChart extends Component {
    constructor(props){
        super(props)
        this.svgRef = React.createRef()
        this.state = {
            radius: '',
            target: '',
        }
    }

    componentDidMount(){
        this.createLocationGraph(this.props)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.screenWidth !== this.props.screenWidth){
            console.log("width changed!")
            this.clearSVG()
            this.resizeChart(nextProps)
        }else{
            console.log("update changed!")
            this.updateNewModules(nextProps)
        }
    }

    resizeChart = (props) => {
        this.createLocationGraph(props)
    }

    clearSVG(){
        var el = this.svgRef.current
        d3.select(el).select("svg").data([]).exit().remove()
    }
    clearLocation(){
        var el = this.svgRef.current
        d3.select(el).select("svg").select("#locationcircle").data([]).exit().remove()
    }

    clearEvalutionResult(){
        var el = this.svgRef.current
        d3.select(el).select("svg").select("#locationpath").data([]).exit().remove()
    }

    updateNewModules = (props) => {
        var el = this.svgRef.current
        var width = props.screenWidth
        var height = props.screenHeight
        var radius = Math.min(width, height) / 2 - 30;
        console.log("radius: ", radius)
        var maxVal = 16
        var r = d3.scaleLinear()
            .domain([0, maxVal])
            .range([0, radius])

        var target = props.stateAll.target

        // add location data
        var angle = parseInt(target)-90
        console.log("angle: ", angle)
        var xIndex = radius*Math.cos(angle*Math.PI/180)
        var yIndex = radius*Math.sin(angle*Math.PI/180)

        d3.select(el).select("svg").select("#locationcircle").attr("r", 6).attr("transform", "translate(" + xIndex + "," + yIndex + ")")

        if(props.stateAll.conv1.length<1){
            d3.select(el).select("svg").select("#locationpath").datum([]).attr("d", [])
            .attr("transform", function(d) {
            return "rotate(" + (-90) + ")"; });
        }else{
            var max_out = props.stateAll.max_out
            var designData1 = parseInt(max_out)-15
            var designData2 = parseInt(max_out)+15
            var designData = [[designData1, designData2],[0, 0]];
            console.log("designData: ", designData)
            var data = [
                [maxVal*Math.cos(designData[0][0]*Math.PI/180), maxVal*Math.sin(designData[0][0]*Math.PI/180)],
                [maxVal*Math.cos(designData[0][1]*Math.PI/180), maxVal*Math.sin(designData[0][1]*Math.PI/180)],
                [designData[1][1]*Math.cos(designData[0][1]*Math.PI/180), designData[1][1]*Math.sin(designData[0][1]*Math.PI/180)],
                [designData[1][0]*Math.cos(designData[0][0]*Math.PI/180), designData[1][0]*Math.sin(designData[0][0]*Math.PI/180)]
            ];
    
            var path1 = "M" + r(data[0][0])+","+r(data[0][1])+" "+
                "A"+ r(maxVal)+","+r(maxVal)+" 0 0,1 "+ r(data[1][0])+","+r(data[1][1])+" "+
                "L" + r(data[2][0])+","+r(data[2][1])+" "+
                "L" + r(data[3][0])+","+r(data[3][1])+" Z";
    
            d3.select(el).select("svg").select("#locationpath").datum(data).attr("d", path1)
                .attr("transform", function(d) {
                return "rotate(" + (-90) + ")"; });
        }       
    }
   
    createLocationGraph(props){
        var el = this.svgRef.current;
        var width = props.screenWidth
        var height = props.screenHeight
        var radius = Math.min(width, height) / 2 - 30;
        var maxVal = 16
        var r = d3.scaleLinear()
            .domain([0, maxVal])
            .range([0, radius]);

        var svg = d3.select(el).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        console.log("svg", svg)

        var gr = svg.append("g")
            .attr("class", "r axis")
            .selectAll("g")
            .data(r.ticks(8).slice(1))
            .enter().append("g")
            .attr("transform", "rotate(0)");

        gr.append("circle")
            .attr("r", r);

        var ga = svg.append("g")
            .attr("class", "a axis")
            .selectAll("g")
            .data(d3.range(0, 360, 30))
            .enter().append("g")
            .attr("transform", function(d) {
                return "rotate(" + (d-90) + ")"; });

        ga.append("line")
            .attr("x2", radius);

        ga.append("text")
            .attr("x", (radius + 6))
            .attr("dy", ".35em")
            .style("text-anchor", function(d) { return d > 180 && d < 360 ? "end" : null; })
            .attr("transform", function(d) { return d > 180 && d < 360 ? "rotate(180 " + (radius + 6) + ",0)" : null; })
            .text(function(d) {
                return d + "°"; });
        
        var myRadius = 30
        var xIndex = myRadius*Math.cos(-45*Math.PI/180)
        var yIndex = myRadius*Math.sin(-45*Math.PI/180)
        svg.append("circle")
            .attr("r", 6)
            .attr("class", "central_circle")
            .attr("transform", "translate(" + xIndex + "," + yIndex + ")")
        var xIndex2 = myRadius*Math.cos(45*Math.PI/180)
        var yIndex2 = myRadius*Math.sin(45*Math.PI/180)
        svg.append("circle")
            .attr("r", 6)
            .attr("class", "central_circle")
            .attr("transform", "translate(" + xIndex2 + "," + yIndex2 + ")")
        var xIndex3 = myRadius*Math.cos(135*Math.PI/180)
        var yIndex3 = myRadius*Math.sin(135*Math.PI/180)
        svg.append("circle")
            .attr("r", 6)
            .attr("class", "central_circle")
            .attr("transform", "translate(" + xIndex3 + "," + yIndex3 + ")")
        var xIndex4 = myRadius*Math.cos(225*Math.PI/180)
        var yIndex4 = myRadius*Math.sin(225*Math.PI/180)
        svg.append("circle")
            .attr("r", 6)
            .attr("class", "central_circle")
            .attr("transform", "translate(" + xIndex4 + "," + yIndex4 + ")")

        //  add data
        var target = props.stateAll.target
        var max_out = props.stateAll.max_out
        var designData1 = parseInt(max_out)-15
        var designData2 = parseInt(max_out)+15
        var designData = [[designData1, designData2],[0, 0]];
        console.log("designData: ", designData)
        var data = [
            [maxVal*Math.cos(designData[0][0]*Math.PI/180), maxVal*Math.sin(designData[0][0]*Math.PI/180)],
            [maxVal*Math.cos(designData[0][1]*Math.PI/180), maxVal*Math.sin(designData[0][1]*Math.PI/180)],
            [designData[1][1]*Math.cos(designData[0][1]*Math.PI/180), designData[1][1]*Math.sin(designData[0][1]*Math.PI/180)],
            [designData[1][0]*Math.cos(designData[0][0]*Math.PI/180), designData[1][0]*Math.sin(designData[0][0]*Math.PI/180)]
        ];

        var path1 = "M" + r(data[0][0])+","+r(data[0][1])+" "+
            "A"+ r(maxVal)+","+r(maxVal)+" 0 0,1 "+ r(data[1][0])+","+r(data[1][1])+" "+
            "L" + r(data[2][0])+","+r(data[2][1])+" "+
            "L" + r(data[3][0])+","+r(data[3][1])+" Z";

        // add location data
        var angle = parseInt(target)-90
        var xIndex = radius*Math.cos(angle*Math.PI/180)
        var yIndex = radius*Math.sin(angle*Math.PI/180)

        if(props.stateAll.conv1.length<1){
            svg.append("path")
            .datum([])
            .attr("class", "line")
            .attr("id", "locationpath")
            .attr("d", [])
            .attr("transform", function(d) {
                return "rotate(" + (-90) + ")"; });
            
            svg.append("circle")
            .attr("r", 0)
            .attr("id", "locationcircle")
            .attr("class", "location_circle")
            .attr("transform", "translate(" + xIndex + "," + yIndex + ")")
        }else{
            svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("id", "locationpath")
            .attr("d", path1)
            .attr("transform", function(d) {
                return "rotate(" + (-90) + ")"; });
            
            svg.append("circle")
            .attr("r", 6)
            .attr("id", "locationcircle")
            .attr("class", "location_circle")
            .attr("transform", "translate(" + xIndex + "," + yIndex + ")")
        }
        
        // location_circle.append("image")
        //                 .attr("xlink:href", require('../image/nus_logo.png'))
    }

    render(){
        console.log("location chart render!!!!!!")
        console.log("screen width: ", this.props.screenWidth)
        return(
            <div ref={this.svgRef} ></div>
        )
    }
}

export default LocationChart;