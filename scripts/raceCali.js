const reduceRaceRC = data => {
		    const races = {}
			data.forEach(crime => {
				if(crime.location.includes('California')){
					let race = crime.race.toUpperCase()
					if(race == '-' || race == 'UNCLEAR' || race == 'NATIVE AMERICAN' || race == 'OTHER'){
						race = 'UNKNOWN'
					}
					if (race in races) races[race]++
					else races[race] = 1	
				}		
			})
		    return races
		}
		
		function sortObject(obj) {
		    return Object.keys(obj).sort().reduce(function (result, key) {
		        result[key] = obj[key];
		        return result;
		    }, {});
		}

		d3.csv("datasetv5.csv")
		.then(reduceRaceRC)
		.then(data => {
		
			dataRC = sortObject(data)
			
			// set the dimensions and margins of the graph
			var widthRC = 400
			    heightRC = 400
			    marginRC = 20

			// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
			var radiusRC = Math.min(widthRC, heightRC) / 2 - marginRC

			// append the svg object to the div called 'my_dataviz'
			var svgRC = d3.select("#raceCali")
			  .append("svg")
			    .attr("width", widthRC)
			    .attr("height", heightRC)
			  .append("g")
			    .attr("transform", "translate(" + widthRC / 2 + "," + heightRC / 2 + ")");


			// set the color scale
			var color = d3.scaleOrdinal()
			  .domain(dataRC)
			  .range(d3.schemeSet2);

			// Compute the position of each group on the pie:
			var pie = d3.pie()
			  .value(function(d) {return d.value; })
			var data_ready = pie(d3.entries(dataRC))
			// Now I know that group A goes from 0 degrees to x degrees and so on.

			// shape helper to build arcs:
			var arcGenerator = d3.arc()
			  .innerRadius(50)
			  .outerRadius(radiusRC)
		   	  .padAngle(.1)
			  .padRadius(50)
			  .cornerRadius(4);

			// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
			svgRC
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
			svgRC
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