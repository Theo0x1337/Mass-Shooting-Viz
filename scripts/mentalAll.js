const reduceRaceMA = data => {
		    const mentals = {}
			data.forEach(crime => {
				if(!crime.location.includes('California')){
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
		.then(reduceRaceMA)
		.then(data => {
		
			dataMA = sortObject(data)
			
			// set the dimensions and margins of the graph
			var widthMA = 400
			    heightMA = 400
			    marginMA = 20

			// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
			var radiusMA = Math.min(widthMA, heightMA) / 2 - marginMA

			// append the svg object to the div called 'my_dataviz'
			var svgMA = d3.select("#mentalAll")
			  .append("svg")
			    .attr("width", widthMA)
			    .attr("height", heightMA)
			  .append("g")
			    .attr("transform", "translate(" + widthMA / 2 + "," + heightMA / 2 + ")");


			// set the color scale
			var color = d3.scaleOrdinal()
			  .domain(dataMA)
			  .range(d3.schemeSet2);

			// Compute the position of each group on the pie:
			var pie = d3.pie()
			  .value(function(d) {return d.value; })
			var data_ready = pie(d3.entries(dataMA))
			// Now I know that group A goes from 0 degrees to x degrees and so on.

			// shape helper to build arcs:
			var arcGenerator = d3.arc()
			  .innerRadius(50)
			  .outerRadius(radiusMA)
		   	  .padAngle(.1)
			  .padRadius(50)
			  .cornerRadius(4);

			// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
			svgMA
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
			svgMA
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
