const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

d3.json(url, (dataset) => {
  
  const w = 800;
  const h = 500;
  const padding = 60;
  
  const parseYear = d3.timeParse("%Y");
  const parseMinutes = d3.timeParse("%M:%S");
  const formatMinutes = d3.timeFormat("%M:%S");

  const xScale = d3.scaleTime()
                   .domain([d3.min(dataset, (d) => parseYear(d.Year)), d3.max(dataset, (d) => parseYear(d.Year))])
                   .range([padding, w - padding]);
  
  const yScale = d3.scaleTime()
                   .domain([d3.max(dataset, (d) => parseMinutes(d.Time)), d3.min(dataset, (d) => parseMinutes(d.Time))])
                   .range([h - padding, padding]);
  
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale).tickFormat(formatMinutes);
  
  const tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .attr('class', 'row rounded shadow-sm p-3 mb-5')
                    .style('opacity', 0);
  
  const svg = d3.select("#graph")
                .append("svg")
                .attr("height", h)
                .attr("width", w);
  
  svg.append("g")
      .attr('id', 'x-axis')
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);
  
  svg.append("g")
     .attr('id', 'y-axis')
     .attr("transform", "translate(" + padding + ", 0)")
     .call(yAxis);
  
  svg.append("text")
     .attr('transform', "translate(" + padding + ", 0)")
     .attr('transform', 'rotate(-90)')
     .attr('x' , -280)
     .attr('y', 20)
     .style('font-size', 18)
     .style('font-weight', 'bold')
     .text('Time (mm:ss)')
  
  svg.append("text")
     .attr('transform', "translate(" + (h - padding) + ", 0)")
     .attr('x' , -60)
     .attr('y', 475)
     .style('font-size', 18)
     .style('font-weight', 'bold')
     .text('Year')
  
  svg.append("circle").attr("cx",620).attr("cy",70).attr("r", 6).attr("id", "doped")
  svg.append("circle").attr("cx",620).attr("cy",100).attr("r", 6).attr("id", "clean")
  svg.append("text").attr("x", 640).attr("y", 70).text("Doping Allegations").style("font-size", "15px").attr("alignment-baseline","middle").attr("id", "legend")
  svg.append("text").attr("x", 640).attr("y", 100).text("No Doping Allegations").style("font-size", "15px").attr("alignment-baseline","middle").attr("id", "legend")
  
  svg.selectAll('circle')
     .data(dataset)
     .enter()
     .append("circle")
     .attr('cx', (d) => xScale(parseYear(d.Year)))
     .attr('cy', (d) => yScale(parseMinutes(d.Time)))
     .attr('r', (d) => 5)
     .attr('class', 'dot')
     .attr('data-xvalue', (d) => parseYear(d.Year))
     .attr('data-yvalue', (d) => parseMinutes(d.Time))
     .attr('id', (d) => { return d.Doping !== '' ? 'doped' : 'clean' })
     .on('mouseover', (d) => {
                               tooltip.transition().duration(200).style('opacity', 1);
                               tooltip.html(`<div class="col-12">${d.Name} - ${d.Nationality}</div><div class="col-12">Record: ${d.Time}</div><div class="col-12 mt-3">${d.Doping}</div>`)
                                      .attr('data-year', parseYear(d.Year))
                                      .style('left', `${d3.event.clientX + 40}px`)
                                      .style('top', `${d3.event.clientY + 40}px`);
                                if (d.Doping !== '') {
                                  tooltip.style('background', 'darkred')
                                         .style('color', 'white');
                                } else {
                                  tooltip.style('background', '#abb9f3')
                                         .style('color', '#1B1B1B');
                                }
                             })
     .on('mouseout', () => tooltip.transition().duration(300).style('opacity', 0));
})
