d3.csv("assets/data/data.csv").then(function(data){
    //Define Variables
    //Select Body
    console.log(data);
    var body = d3.select('scatter');
    var margin = {top: 40, right:40, bottom:40,left: 40}
    var h = 500 - margin.top - margin.bottom
    var w = 500 - margin.left - margin.right
    var formatPercent = d3.format('0.2%');

    //Define Scales: Scales are like scales we use same in manual graphs
    //var colorscale = d3.scale.category20()
    var xScale = d3.scaleLinear().domain([30,0]).range([0,w])
    var yScale = d3.scaleLinear().domain([0,30]).range([h,0])

    //Append SVG
    var svg = body.append('svg')
    .attr('height', h + margin.top + margin.bottom)
    .attr('width', w+margin.left +margin.right)
    //append group g
    .append('g')
    .attr('transform', 'translate(' + margin.left+ ',' + margin.top +')')

    //Declare x-axis
    //var xAxis = d3.svg.axis()
    //.scale(xScale).tickFormat(formatPercent).ticks(5).orient('bottom')

    //Declare Y-axis
    //var yAxis = d3.svg.axis()
    //.scale(yScale).tickFormat(formatPercent).ticks(5).orient('left')


    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    //Declare circle for scatter plot
    var circle = svg.selectAll('circle')
    .attr('cx', function(d){ return xScale(d.poverty)})
    .attr('cy', function(d) { return yScale(d.healthcareLow)})
    .attr('r','10')
    .attr('stroke', 'black')
    .attr('stroke-width',1)
    .attr('fill', function(d,i) { return colorscale(i)})
    .on('mouseover', function(){
        d3.select(this)
        .transition()
        .duration(500)
        .attr('r',10)
        .attr('stroke-width',1)
    })
    .append('title')
    .text(function (d) { return d.state + 
    '\nReturn: ' +formatPercent(d.poverty)+
    '\nReturn: ' +formatPercent(d.healthcareLow) })

    //X-axis text ticks
    svg.append('g')
      .attr('class','axis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('class','label')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('Percentage Poverty')

      //Yaxis text append

      svg.append('g')
      .attr('class', 'axis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('class','label')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text('% Health Care')


      console.log("Hello WOrld!")


    });

    




