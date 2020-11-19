const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

d3.json(url, (data) => {
  const dataset = data.monthlyVariance;
  const base = data.baseTemperature;
  const maxTemp = d3.max(dataset, (d) => d.variance) + base;
  
  const w = 1000;
  const h = 600;
  const padding = 80;
  
  const svg = d3.select('#container')
                .append('svg')
                .attr('height', h)
                .attr('width', w)
  
  const legend = d3.select('#container')
                .append('svg')
                .attr('height', 100)
                .attr('width', w)
                .attr('id', 'legend');
  
  const tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .attr('class', 'rounded shadow-sm p-2 bg-dark text-light')
                    .style('opacity', 0);
  
  svg.append('text')
     .attr('x', 200)
     .attr('y', 25)
     .attr('font-size', 32)
     .attr('id', 'title')
     .text('Global Temperature by Month (1753 to 2015)')
  
  svg.append('text')
     .attr('x', 370)
     .attr('y', 60)
     .attr('font-size', 24)
     .attr('id', 'description')
     .text('Base temperature 8.66℃')
  
  const formatMonth = d3.timeFormat('%B')
  const parseMonth = d3.timeParse('%m')
  const parseYear = d3.timeParse('%Y')
  const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
  let years = []
  for (let i=1753; i < 2016; i++) {
    years.push(i);
  }
  
  const xScale = d3.scaleBand()
                   .domain(years)
                   .range([padding, w - padding])
                   .padding(0.01);
  const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter((d) => d%20 === 0));
  const yScale = d3.scaleBand()
                   .domain([1,2,3,4,5,6,7,8,9,10,11,12])
                   .range([h - padding, padding])
                   .padding(0.01);
  const yAxis = d3.axisLeft(yScale).tickFormat((d, i) => months[i]);
  
  svg.append("g")
      .attr('id', 'x-axis')
      .attr('class', 'axisWhite')
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);
  
  svg.append("g")
     .attr('id', 'y-axis')
     .attr('class', 'axisWhite')
     .attr("transform", "translate(" + padding + ", 0)")
     .call(yAxis);
  
  svg.selectAll('rect')
     .data(dataset)
     .enter()
     .append('rect')
     .attr('x', (d) => xScale(d.year))
     .attr('y', (d) => yScale(d.month))
     .attr('width', xScale.bandwidth()) 
     .attr('height', yScale.bandwidth())
     .attr('class', 'cell')
     .attr('data-month', (d) => d.month - 1)
     .attr('data-year', (d) => d.year)
     .attr('data-temp', (d) => d.variance + base)
     .attr('fill', (d) => {
                            if (d.variance + base >= Math.floor(9/10*maxTemp * 100) / 100) {
                              return '#8B0000';
                            } else if (d.variance + base >= Math.floor(8/10*maxTemp * 100) / 100) {
                              return 'red';
                            } else if (d.variance + base >= Math.floor(7/10*maxTemp * 100) / 100) {
                              return '#ff8c00';
                            } else if (d.variance + base >= Math.floor(6/10*maxTemp * 100) / 100) {
                              return 'orange';
                            } else if (d.variance + base >= Math.floor(5/10*maxTemp * 100) / 100) {
                              return 'yellow';
                            } else if (d.variance + base >= Math.floor(4/10*maxTemp * 100) / 100) {
                              return '#F0F8FF';
                            } else if (d.variance + base >= Math.floor(3/10*maxTemp * 100) / 100) {
                              return 'lightblue';
                            } else if (d.variance + base >= Math.floor(2/10*maxTemp * 100) / 100) {
                              return 'blue';
                            } else if (d.variance + base >= Math.floor(1/10*maxTemp * 100) / 100) {
                              return 'darkblue';
                            } else { return '#000065' }
                          })
      .on('mouseover', (d) => {
                               
                               tooltip.transition().duration(200).style('opacity', 0.8);
                               tooltip.html(`<div>${d.year} - ${months[d.month - 1]}</div><div>T: ${(d.variance + base).toFixed(1)}℃</div>`)
                                      .attr('data-year', d.year)
                                      .style('left', `${d3.event.clientX + 40}px`)
                                      .style('top', `${d3.event.clientY + 40}px`)
                                      .style('class', 'bg-dark text-light');
                             })
     .on('mouseout', () => tooltip.transition().duration(300).style('opacity', 0));
  
  // Legend
  let legendValues =[]
  for (i=1; i < 10; i++) {
    legendValues.push((Math.floor(i/10 * maxTemp * 100) / 100));
  }
  console.log(legendValues)
  legend.selectAll('squares')
        .data(legendValues)
        .enter()
        .append('rect')
        .attr('x', (d, i) => 300 + i*40)
        .attr('y', 30)
        .attr('height', 40)
        .attr('width', 40)
        .attr('id', 'legend')
        .attr('fill', (d) => {
                              if (d >= Math.floor(9/10 * maxTemp * 100) / 100) {
                                return '#8B0000';
                              } else if (d >= Math.floor(8/10*maxTemp * 100) / 100) {
                                return 'red';
                              } else if (d >= Math.floor(7/10*maxTemp * 100) / 100) {
                                return '#ff8c00';
                              } else if (d >= Math.floor(6/10*maxTemp * 100) / 100) {
                                return 'orange';
                              } else if (d >= Math.floor(5/10*maxTemp * 100) / 100) {
                                return 'yellow';
                              } else if (d >= Math.floor(4/10*maxTemp * 100) / 100) {
                                return '#F0F8FF';
                              } else if (d >= Math.floor(3/10*maxTemp * 100) / 100) {
                                return 'lightblue';
                              } else if (d >= Math.floor(2/10*maxTemp * 100) / 100) {
                                return 'blue';
                              } else if (d >= Math.floor(1/10*maxTemp * 100) / 100) {
                                return 'darkblue';
                              } else { return '#000065' }
                            })
  
  legendValues.push(maxTemp.toFixed(2));
  legend.selectAll('text')
        .data(legendValues)
        .enter()
        .append('text')
        .text((d) => d)
        .attr('x', (d, i) => 290 + i*40)
        .attr('y', 25)
        .style('font-size', '14px')
        .style('fill', 'white')

})
