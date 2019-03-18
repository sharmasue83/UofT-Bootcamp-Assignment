d3.csv("assets/data/data.csv").then(function(data) {

	// cast types
    data.forEach(function(state) {
      state.healthcare = +state.healthcare;
      state.poverty = +state.poverty;
    });

    var svgWidth = 860;
    var svgHeight = 500;

    var margin = {
    top: 30,
    right: 40,
    bottom: 60,
    left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty), d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.healthcare), d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    // axes
	var bottomAxis = d3.axisBottom(xLinearScale);
	var leftAxis = d3.axisLeft(yLinearScale);

	chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

	chartGroup.append("g")
      .call(leftAxis);

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2) - 40)
      .attr("dy", "1em")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2 - 30}, ${height + margin.top + 30})`)
      .text("In Poverty (%)");
    
    // circles
    var circles = chartGroup.selectAll("g.circles");

    circles = circles.data(data)
            .enter()
            .append("g")
            .classed("circles", true)
            .attr("transform", d => "translate("+ [xLinearScale(d.poverty), yLinearScale(d.healthcare)] + ")");

    circles.append("circle")
    	.attr("r", "15")
   		.attr("fill", "lightblue")
   		.attr("opacity", ".5");

   	circles.append("text")
        .text(d => d.abbr)
    	.attr("font-size", "13px")
     	.attr("text-anchor", "middle");
    
    // tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .style("background", "orange")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    chartGroup.call(toolTip);

    circles.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

});