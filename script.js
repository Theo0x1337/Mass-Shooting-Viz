var data = d3.range(500).map(d3.randomBates(10));

var svg = d3.select("svg");
var width = d3.svg("width");
var height = d3.svg("height")-50;
var g = svg.append("g");

var bins = d3.histogram()
    (data);