const reduceRaceRA = data => {
		    const races = {}
			data.forEach(crime => {
				if(!crime.location.includes('California')){
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
		.then(reduceRaceRA)
		.then(data => {
		
			dataRA = sortObject(data)
			
			// set the dimensions and margins of the graph
			var widthRA = 400
			    heightRA = 400
			    marginRA = 20

			// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
			var radiusRA = Math.min(widthRA, heightRA) / 2 - marginRA

			// append the svg object to the div called 'my_dataviz'
			var svgRA = d3.select("#raceAll")
			  .append("svg")
			    .attr("width", widthRA)
			    .attr("height", heightRA)
			  .append("g")
			    .attr("transform", "translate(" + widthRA / 2 + "," + heightRA / 2 + ")");


			// set the color scale
			var color = d3.scaleOrdinal()
			  .domain(dataRA)
			  .range(d3.schemeSet2);

			// Compute the position of each group on the pie:
			var pie = d3.pie()
			  .value(function(d) {return d.value; })
			var data_ready = pie(d3.entries(dataRA))
			// Now I know that group A goes from 0 degrees to x degrees and so on.

			// shape helper to build arcs:
			var arcGenerator = d3.arc()
			  .innerRadius(50)
			  .outerRadius(radiusRA)
		   	  .padAngle(.1)
			  .padRadius(50)
			  .cornerRadius(4);

			// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
			svgRA
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
			svgRA
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