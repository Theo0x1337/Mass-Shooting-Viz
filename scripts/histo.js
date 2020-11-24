// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 90, left: 40},
    width4 = 960,
    height4 = 500;

// append the svg object to the body of the page
var svg4 = d3.select("#my_dataviz4")
  .append("svg")
    .attr("width", width4 + margin.left + margin.right)
    .attr("height", height4 + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("fatalitiesByStates.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width4 ])
  .domain(data.map(function(d) { return d.state; }))
  .padding(0.2);
svg4.append("g")
  .attr("transform", "translate(0," + height4 + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 150])
  .range([ height4, 0]);
svg4.append("g")
  .call(d3.axisLeft(y));

// Bars
svg4.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.state); })
    .attr("width", x.bandwidth())
    .attr("fill", "#69b3a2")
    // no bar at the beginning thus:
    .attr("height", function(d) { return height4 - y(0); }) // always equal to 0
    .attr("y", function(d) { return y(0); })

// Animation
svg4.selectAll("rect")
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.fatalities); })
  .attr("height", function(d) { return height4 - y(d.fatalities); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

})