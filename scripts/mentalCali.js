
const reduceRaceMC = data => {
    const mentals = {}
	data.forEach(crime => {
		if(crime.location.includes('California')){
			let mental = crime.prior_signs_mental_health_issues.toUpperCase()
			if(mental == 'TBD'){
				mental = 'UNCLEAR'
			}
			if(mental == '-'){
				mental = 'UNKNOWN'
			}
			if (mental in mentals) mentals[mental]++
			else mentals[mental] = 1	
		}		
	})
    return mentals
}

function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

d3.csv("datasetv5.csv")
.then(reduceRaceMC)
.then(data => {

	dataMC = sortObject(data)
	
	// set the dimensions and margins of the graph
	var widthMC = 400
	    heightMC = 400
	    marginMC = 20

	// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
	var radiusMC = Math.min(widthMC, heightMC) / 2 - marginMC

	// append the svg object to the div called 'my_dataviz'
	var svgMC = d3.select("#mentalCali")
	  .append("svg")
	    .attr("width", widthMC)
	    .attr("height", heightMC)
	  .append("g")
	    .attr("transform", "translate(" + widthMC / 2 + "," + heightMC / 2 + ")");


	// set the color scale
	var color = d3.scaleOrdinal()
	  .domain(dataMC)
	  .range(d3.schemeSet2);

	// Compute the position of each group on the pie:
	var pie = d3.pie()
	  .value(function(d) {return d.value; })
	var data_ready = pie(d3.entries(dataMC))
	// Now I know that group A goes from 0 degrees to x degrees and so on.

	// shape helper to build arcs:
	var arcGenerator = d3.arc()
	  .innerRadius(50)
	  .outerRadius(radiusMC)
   	  .padAngle(.1)
	  .padRadius(50)
	  .cornerRadius(4);

	// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
	svgMC
	  .selectAll('mySlices')
	  .data(data_ready)
	  .enter()
	  .append('path')
	    .attr('d', arcGenerator)
	    .attr('fill', function(d){ return(color(d.data.key)) })
	    .attr("stroke", "black")
	    .style("stroke-width", "2px")
	    .style("opacity", 0.7)

	// Now add the annotation. Use the centroid method to get the best coordinates
	svgMC
	  .selectAll('mySlices')
	  .data(data_ready)
	  .enter()
	  .append('text')
	  .text(function(d){ return d.data.key})
	  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) +")";  })
	  .style("text-anchor", "middle")
	  .style("font-size", 17)
	  .style("font-weight", "bold")
	  //(startAngle + endAngle) / 2 and (innerRadius + outerRadius)
})