/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
		
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */


//Width and height of map
var width = 960;
var height = 500;

// D3 Projection
var projection6 = d3.geo.albersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US
        
// Define path generator
var path6 = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection6);  // tell path generator to use albersUsa projection

		
// Define linear scale for output
var color6 = d3.scale.linear()
				.range(["rgb(102,205,170)","rgb(69,173,168)","rgb(217,91,67)","rgb(84,36,55)"]);

var legendText6 = ["Inhabitants < 50 000 000"," Inhabitants < 30 000 000", "Inhabitants < 20 000 000","Inhabitants < 10 000 000 "];

//Create SVG element and append map to the SVG
var svg6 = d3.select("#mapUsHab")
			.append("div").attr("class", "mapUsHabOui")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
        
// Append Div for tooltip to SVG
var div6 = d3.select("#mapUsHab")
		    .append("div")   
    		.attr("class", "tooltip2")               
            .style("opacity", 0);
            

// Load in my states data!
d3.csv("habitants.csv", function(data) {
color6.domain([1,2,3,4]); // setting the range of the input data

// Load GeoJSON data and merge with states data
d3.json("us-states.json", function(json) {

// Loop through each state data value in the .csv file
for (var i = 0; i < data.length; i++) {

	// Grab State Name
	var dataState = data[i].states;

	// Grab data value 
    var dataValue = data[i].indice;

    var habValue = data[i].values

	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < json.features.length; j++)  {
		var jsonState = json.features[j].properties.name;

        console.log(dataState == jsonState)

		if (dataState == jsonState) {

        // Copy the data value into the JSON
        json.features[j].properties.states = dataState;
        json.features[j].properties.values = dataValue;
        json.features[j].properties.hab = habValue; 

		// Stop looking through the JSON
		break;
		}
	}
}

console.log(json.features)
		
// Bind the data to the SVG and create one path per GeoJSON feature
svg6.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path6)
	.style("stroke", "#fff")
    .style("stroke-width", "1")
    // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
	// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
	.on("mouseover", function(d) {      
    	div.transition()        
      	   .duration(200)      
           .style("opacity", .9);
           div.text("Inhabitants in "+d.properties.states+ " : " + d.properties.hab)
           .style("left", (d3.event.pageX) + "px")     
           .style("top", (d3.event.pageY - 60) + "px");    
	})   

    // fade out tooltip on mouse out               
    .on("mouseout", function(d) {       
        div.transition()        
           .duration(500)      
           .style("opacity", 0);   
    })
	.style("fill", function(d) {

	// Get data value
	var value = d.properties.values;

	if (value) {
	//If value exists…
	return color6(value);
	} else {
	//If value is undefined…
	return "rgb(213,222,217)";
	}
});
         
// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
var newLegend = d3.select("#mapUsHab").append("svg")
      			.attr("class", "newLegend")
     			.attr("width", 200)
    			.attr("height", 200)
   				.selectAll("g")
   				.data(color6.domain().slice().reverse())
   				.enter()
   				.append("g")
     			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  	newLegend.append("rect")
   		  .attr("width", 20)
   		  .attr("height", 20)
   		  .style("fill", color6);

    newLegend.append("text")
  		  .data(legendText6)
      	  .attr("x", 30)
      	  .attr("y", 9)
      	  .attr("dy", ".35em")
      	  .text(function(d) { return d; });
	});

});