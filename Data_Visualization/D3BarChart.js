const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(url, (data) => { 
  const dataset = data.data;
  const w = 1000;
  const h = 500;
  const padding = 60;
  const xScale = d3.scaleTime()
                   .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
                   .range([padding, w - padding]);
  const xAxis = d3.axisBottom(xScale);
  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset, (d) => d[1])])
                   .range([h - padding, padding]);
  const yAxis = d3.axisLeft(yScale);
  const svg = d3.select("#graph")
                .append("svg")
                .attr("height", h)
                .attr("width", w);
  
  let tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .attr('class', 'row')
                    .style('opacity', 0);
  
  svg.append("g")
      .attr('id', 'x-axis')
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);
  
  svg.append("g")
     .attr('id', 'y-axis')
     .attr("transform", "translate(" + padding + ", 0)")
     .call(yAxis);
  
  svg.selectAll('rect')
     .data(dataset)
     .enter()
     .append('rect')
     .attr('x', (d) => xScale(new Date(d[0])))
     .attr('y', (d) => yScale(d[1]))
     .attr('width', 2.5)
     .attr('height', (d) => yScale(d3.max(dataset, (d) => d[1]) - d[1]) - padding)
     .attr('class', 'bar')
     .attr('fill', '#1B1B1B')
     .attr('data-date', (d) => d[0])
     .attr('data-gdp', (d) => d[1])
     .on('mouseover', (d) => {
                                let date = new Date(d[0]);
                                tooltip.transition().duration(200).style('opacity', 0.9);
                                tooltip.html(`<div class="col-12">Year: <strong>${date.getYear() + 1900}</strong></div><div class="col-12">Budget: <strong>\$${d[1]}</strong>  billion</div>`)
                                       .style('left', `${d3.event.layerX + 130}px`)
                                       .style('top', `${(d3.event.layerY - 120)}px`)
                                       .attr('data-date', d[0]);
                             })
     .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));
     
  /*
     .text((d) => {
                    let date = new Date(d[0]);
                    return 'Year: ' + (date.getYear() + 1900) + '\nBudget: $' + d[1] + ' billion';
                  })*/
     
});

