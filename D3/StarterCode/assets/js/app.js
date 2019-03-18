
//Load data from data.csv
d3.csv("assets/data/data.csv").then(function(error,healthData){
    var svgWidth = 500;
    var svgHeight = 400;
    //log an error if error exists
    if (error) return console.warn(error);

  //Print the data
    console.log(healthData);
    
  
// Define the chart's margins as an object
    var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };
  var svg = d3.select("#scatter")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);
  

    // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
  // to the margins set in the "chartMargin" object.
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//var groups = ["beetles"]

    // Define dimensions of the chart area
  var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
  var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
  //log an error if error exists
  if (error) return console.warn(error);

  //Print the data
  console.log(healthData);
  
    var dataReady = healthData.map( function(grpName){
    return {
      name: grpName,
      values: healthData.map( function (d) {
        return {Poverty: d.poverty, healthLow: d.healthcareLow}
      }) 
    }
  });


    var myColor = d3.scaleOrdinal().
  domain(groups).
  range(d3.schemeSet2);

  

  //Create scales to give the range selection
   //Use bottomAxis and LeftAxis to create the chart's axes using passes in scales.
  var xScale = d3.scaleLinear().domain(30,0).range([0,chartWidth]);
  var yScale = d3.scaleLinear().domain(0,30).range([chartHeight, 0]);
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g").attr("transform",`translate(0,${chartHeight}`)
  .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);
 
  var circle = d3.circle()
              .xScale(function(d) {return xScale(+d.provety)})
              .yScale(function(d) {return yScale(+d.healthcareLow)})


  // Initialize tool tip
  //Append tooltip div
  //var toolTip = d3.select("#scatter").append("div").classed("tooltip",true);

  var toolTip = d3.tip().attr("class","tooltip").offset([80,-60])
  .html(function(t){
      return (`Poverty: ${t.poverty}<br> HealthCare: ${t.healthcareLow}`);       
  });

  //Create a tool tip in a chart

  chartGroup.call(toolTip);

  chartGroup.selectAll("circle").data(healthData)
  .attr("cx", function(data,index){
      return xScale(data.poverty)
  })
  .attr("cy", function(data,index){
      return yScale(data.healthcareLow)
  })
  .attr("r", "10").attr("fill","lightblue")
  .on("mouseenter", function(data){
      toolTip.show(data);
      })
  .on("mouseout", function(data,index){
      toolTip.hide(data);
  });


  chartGroup.append("text")
          .style("text-anchor","middle")
          .style("font-size","12px")
          .selectAll("tspan")
          .attr("x", function(data){
              return xScale(data.poverty -0.1);
                  })
          .attr("y", function(data){
              return yScale(data.healthcareLow - 0.3);
                  })
                  .text(function(data){
                      return data.abbr
                  });

  
          
  
  chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0-margin.left + 40)
      .attr("x", 0 - chartHeight/2)
      .attr("dy","1em")
      .attr("class", "axis-text")
      .text("Health Care(%)")



  chartGroup
      .append("text")
      .attr(
          "transform",
          "translate(" +chartWidth / 2 + " ," +(chartHeight + margin.top + 30) + ")"
      )
      .attr("class", "axis-text")
      .text("Poverty (%)");




  //Create event Listener to display and hide the tool tip



  //Create mouseover event listener to display toolip




});





/*
// @TODO: YOUR CODE HERE!
//Define svg area dimension

var svgWidth = 1000;
var svgHeight = 800;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };
  
  // Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


//Load data from data.csv
d3.csv("assets/data/data.csv", function(error,healthData){

    //log an error if error exists
    if (error) return console.warn(error);

    //Print the data
    console.log(healthData);

    healthData.forEach(function(data){
        data.poverty = +data.poverty;
        data.healthLow = +data.healthcareLow;
    });

    //Create scales to give the range selection
    var yScale = d3.scaleLinear().domain(0,30).range([chartHeight, 0]);
    var xScale = d3.scaleLinear().domain(30,0).range([0,chartWidth]);


    //Use bottomAxis and LeftAxis to create the chart's axes using passes in scales.
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);


    // Initialize tool tip
    //Append tooltip div
    //var toolTip = d3.select("#scatter").append("div").classed("tooltip",true);

    var toolTip = d3.tip().attr("class","tooltip").offset([80,-60])
    .html(function(t){
        return (`Poverty: ${t.poverty}<br> HealthCare: ${t.healthcareLow}`);       
    });

    //Create a tool tip in a chart

    chartGroup.call(toolTip);

    chartGroup.selectAll("circle").data(healthData)
    .enter().append("circle")
    .attr("cx", function(data,index){
        return xScale(data.poverty)
    })
    .attr("cy", function(data,index){
        return yScale(data.healthcareLow)
    })
    .attr("r", "10").attr("fill","lightblue")
    .on("mouseenter", function(data){
        toolTip.show(data);
        })
    .on("mouseout", function(data,index){
        toolTip.hide(data);
    });


    chartGroup.append("text")
    .style("text-anchor","middle")
    .style("font-size","12px")
    .selectAll("tspan")
    .attr("x", function(data){
        return xScale(data.poverty -0.1);
            })
    .attr("y", function(data){
        return yScale(data.healthcareLow - 0.3);
            })
            .text(function(data){
                return data.abbr
            });

    chartGroup.append("g").attr("transform",`translate(0,${chartHeight}`)
    .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);
    chartGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-margin.left + 40)
        .attr("x", 0 - chartHeight/2)
        .attr("dy","1em")
        .attr("class", "axis-text")
        .text("Health Care(%)")



    chartGroup
        .append("text")
        .attr(
            "transform",
            "translate(" +chartWidth / 2 + " ," +(chartHeight + margin.top + 30) + ")"
        )
        .attr("class", "axis-text")
        .text("Poverty (%)");




    //Create event Listener to display and hide the tool tip



    //Create mouseover event listener to display toolip




});

*/