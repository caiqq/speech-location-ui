import React, { Component } from 'react';
import * as d3 from 'd3'
import '../stypes/LocationChart.css'
import configure from '../config.json';

class LocationChart extends Component {
    constructor(props){
        super(props)
        this.svgRef = React.createRef()
        this.state = {
            xWidth: '',
            yHeight: '',
            radius: '',
        }


    }

    componentDidMount(){
        console.log(this.props)
        this.createLocationGraph(this.props)
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

        var gr = svg.append("g")
            .attr("class", "r axis")
            .selectAll("g")
            .data(r.ticks(8).slice(1))
            .enter().append("g")
            .attr("transform", "rotate(0)");

        gr.append("circle")
            .attr("r", r);


        // gr.append("text")
        //     .attr("y", function(d) { return -r(d) - 4; })
        //     .attr("transform", "rotate(45)")
        //     .style("text-anchor", "middle")
        //     .text(function(d) { return d; });

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
        

        // central sound lisener
        // var central_positions = [-45, 45, 135, 225]
        // for(var position in central_positions){
        //     console.log("position: ", position)
        //     var myRadius = 30
        //     var xIndex = myRadius*Math.cos(position*Math.PI/180)
        //     var yIndex = myRadius*Math.sin(position*Math.PI/180)
        //     svg.append("circle")
        //    .attr("r", 6)
        //    .attr("class", "central_circle")
        //    .attr("transform", "translate(" + xIndex + "," + yIndex + ")")
        // }
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
        // var designData = [[172, 200],[2.86, 5.06]];
        var designData = [[0, 30],[0, 0]];
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

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", path1)
            .attr("transform", function(d) {
                return "rotate(" + (-90) + ")"; });

        // add location data
        var angle = -70
        var xIndex = radius*Math.cos(angle*Math.PI/180)
        var yIndex = radius*Math.sin(angle*Math.PI/180)
        var location_circle = svg.append("circle")
                            .attr("r", 6)
                            .attr("class", "location_circle")
                            .attr("transform", "translate(" + xIndex + "," + yIndex + ")")
        
        // location_circle.append("image")
        //                 .attr("xlink:href", require('../image/nus_logo.png'))
        // var yHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;
        // this.setState({
        //   yRange: this.props.yRange,
        //   yScales: this.props.yScales,
        //   ySteps: this.props.ySteps,
        //   yAxises: this.props.yAxises,
        //   yHeight: yHeight,
        // }, function(){
        //   this.resizeChart(this.props)
        // })
    }
    componentWillReceiveProps(nextProps){
        // if(nextProps.width !== this.props.width){
        //     this.resizeChart(nextProps)
        // }else{
        //     this.updateNewModules(nextProps)
        // }
    }
    
    componentWillUpdate(nextProps){
        // var el = this.svgRef.current
        // var that = this

        // var svg = d3.select(el).select("svg")
        // var tips = svg.select("g.tips")
        
        // svg.on("mouseover", function() {
        //     var m = d3.mouse(this)
        //     var position = that.getTipsPosition(m)
        //     var x = that.state.invertX(m[0]-nextProps.margin.left)
        //     tips.select(".tips-text1").text(that.props.xValues[x])      
        //     tips.transition()
        //         .attr("transform","translate("+position[0]+","+position[1]+")")
        //     tips.style("display", "block")
        //     })
        //     .on("mouseout", function(){
        //     tips.style("display", "none")
        //     })
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