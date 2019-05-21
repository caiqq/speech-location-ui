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
            // this.clearSVG()
            // this.resizeChart(nextProps)
        } else {
            console.log("update changed!")
            // this.updateNewModules(nextProps)
        }
    }

    componentDidMount() {
        this.createDotGraph(this.props)
    }

    resizeChart = (props) => {
        this.createDotGraph(props)
    }

    createDotGraph = (props) => {
        var el = this.svgRef.current;

        console.log("create dot graph!")

        var width = 480
        var height = 250
        // var radius = Math.min(width, height) / 2 - 30;
        var radius = Math.min(width, height);
        var maxVal = 20
        var r = d3.scaleLinear()
            .domain([0, maxVal])
            .range([0, radius]);

        var svg = d3.select(el).append("svg")
            .attr("width", width)
            .attr("height", height)

        var origin = [480, 300], j = 10, scale = 20, scatter = [], yLine = [], beta = 0, alpha = 0,
         key = function (d) { return d.id; }, startAngle = Math.PI / 4;
        var svg = d3.select(el).select('svg').call(d3.drag().on('drag', this.dragged).on('start', this.dragStart).on('end', this.dragEnd)).append('g');
        var svg = d3.select(el).select('svg').append('g');
        var color = ["#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2", "#69b3a2"]
        var mx, my, mouseX, mouseY;

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

        var yScale3d = _3d()
            .shape('LINE_STRIP')
            .origin(origin)
            .rotateY(startAngle)
            .rotateX(-startAngle)
            .scale(scale);

        var cnt = 0;
        var xGridArray = []
        // var scatter = [], yLine = [];
        for (var z = -j; z < j; z++) {
            for (var x = -j; x < j; x++) {
                xGridArray.push([x, 1, z]);
                scatter.push({ x: x, y: d3.randomUniform(0, -10)(), z: z, id: 'point_' + cnt++ });
            }
        }
        d3.range(-1, 11, 1).forEach(function (d) { yLine.push([-j, -d, -j]); });

        var data = [
            grid3d(xGridArray),
            point3d(scatter),
            yScale3d([yLine])
        ];

        var tt = 1000

        var svg = d3.select(el).select('svg').select('g');
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
            .attr('cx', this.posPointX)
            .attr('cy', this.posPointY);

        points.exit().remove();

        /* ----------- y-Scale ----------- */

        // var yScale = svg.selectAll('path.yScale').data(data[2]);

        // yScale
        //     .enter()
        //     .append('path')
        //     .attr('class', '_3d yScale')
        //     .merge(yScale)
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', .5)
        //     .attr('d', yScale3d.draw);

        // yScale.exit().remove();

        /* ----------- y-Scale Text ----------- */

        // var yText = svg.selectAll('text.yText').data(data[2][0]);

        // yText
        //     .enter()
        //     .append('text')
        //     .attr('class', '_3d yText')
        //     .attr('dx', '.3em')
        //     .merge(yText)
        //     .each(function (d) {
        //         d.centroid = { x: d.rotated.x, y: d.rotated.y, z: d.rotated.z };
        //     })
        //     .attr('x', function (d) { return d.projected.x; })
        //     .attr('y', function (d) { return d.projected.y; })
        //     .text(function (d) { return d[1] <= 0 ? d[1] : ''; });

        // yText.exit().remove();

        d3.selectAll('._3d').sort(_3d().sort);
    }


    posPointX(d) {
        return d.projected.x;
    }

    posPointY(d) {
        return d.projected.y;
    }


    // dragStart() {
    //     // mx = d3.event.x;
    //     // my = d3.event.y;
    //     this.setState({
    //         mx: d3.event.x,
    //         my: d3.event.y
    //     })
    // }

    // dragged() {
    //     var startAngle = Math.PI / 4;
    //     this.setState({
    //         mouseX: this.state.mouseX || 0,
    //         mouseY: this.state.mouseY || 0
    //     })
    //     // mouseX = mouseX || 0;
    //     // mouseY = mouseY || 0;
    //     var beta = (d3.event.x - this.state.mx + this.state.mouseX) * Math.PI / 230;
    //     var alpha = (d3.event.y - this.state.my + this.state.mouseY) * Math.PI / 230 * (-1);
    //     var data = [
    //         grid3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(xGrid),
    //         point3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)(scatter),
    //         // yScale3d.rotateY(beta + startAngle).rotateX(alpha - startAngle)([yLine]),
    //     ];
    //     processData(data, 0);
    // }

    // dragEnd() {
    //     this.setState({
    //         mouseX: d3.event.x - this.state.mx + this.state.mouseX,
    //         mouseY: d3.event.y - this.state.my + this.state.mouseY
    //     })
    //     // mouseX = d3.event.x - mx + mouseX;
    //     // mouseY = d3.event.y - my + mouseY;
    // }

    render() {
        console.log("D3 DotChart render!!!!!!")
        return (
            <div ref={this.svgRef} ></div>
        )
    }
}

export default D3DotChart;