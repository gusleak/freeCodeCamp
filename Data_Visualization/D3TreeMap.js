const url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

d3.json(url, (error, data) => {
  if (error) throw error;
  const w = 1000,
        h = 500,
        padding = 80
  
  const svg = d3.select('#map')
              .append('svg')
              .attr('height', h)
              .attr('width', w)
  
  const tooltip = d3.select('body')
                  .append('div')
                  .attr('id', 'tooltip')
                  .attr('class', 'rounded-pill border shadow-sm p-4 bg-dark text-light')
                  .style('opacity', 0);

  let root = d3.hierarchy(data)
               .sum((d) => d.value)
  
  d3.treemap().size([w, h])(root)
  
  svg.selectAll('rect')
      .data(root.leaves())
      .enter()
      .append('rect')
      .attr('x', (d) => d.x0)
      .attr('y',(d) => d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('class', 'tile')
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => d.data.value)
      .style("fill", (d) => {
                              if (d.data.category === "Action") {
                                return '#DC143C'
                              } else if (d.data.category === "Adventure") {
                                return '#7B68EE'
                              }  else if (d.data.category === "Family") {
                                return 'lightblue'
                              }  else if (d.data.category === "Animation") {
                                return '#228B22'
                              }  else if (d.data.category === "Comedy") {
                                return '#FFD700'
                              }  else if (d.data.category === "Biography") {
                                return '#FFFFF0'
                              }  else if (d.data.category === "Drama") {
                                return '#ffcccb'
                              }
                            })
    .on('mouseover', (d) => {
                               const formatter = new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              });
                               tooltip.transition().duration(200).style('opacity', 0.9);
                               tooltip.html(`<div><strong>${d.data.name}</strong></div><div>Genre: ${d.data.category}</div><div>${formatter.format(d.data.value).slice(0, -3)}</div>`)
                                      .attr('data-value', d.data.value)
                                      .style('left', `${d3.event.clientX + 20}px`)
                                      .style('top', `${d3.event.clientY + 20}px`)
                                      .style('class', 'bg-light text-dark');
                             })
     .on('mouseout', () => tooltip.transition().duration(300).style('opacity', 0));
  
  const legend = d3.select('#legend')
                   .append('svg')
                   .attr('height', 60)
                   .attr('width', w);
  
  let categorySet = new Set();
  for (let i=0; i < data.children.length; i++) {
    categorySet.add(data.children[i].name);
  }
  let categories = Array.from(categorySet);
  
  legend.selectAll('squares')
        .data(categories)
        .enter()
        .append('rect')
        .attr('x', (d, i) => 300 + i*80)
        .attr('y', 40)
        .attr('height', 30)
        .attr('width', 50)
        .attr('class', 'legend-item')
        .style('fill', (d, i) => {
                                console.log(d)
                                if (d === "Action") {
                                  return '#DC143C'
                                } else if (d === "Adventure") {
                                  return '#7B68EE'
                                } else if (d === "Family") {
                                  return 'lightblue'
                                } else if (d === "Animation") {
                                  return '#228B22'
                                } else if (d === "Comedy") {
                                  return '#FFD700'
                                } else if (d === "Biography") {
                                  return '#FFFFF0'
                                } else if (d === "Drama") {
                                  return '#ffcccb'
                                }
                              });
  legend.selectAll('text')
        .data(categories)
        .enter()
        .append('text')
        .attr('x', (d, i) => 300 + i*80)
        .attr('y', 35)
        .text((d) => d)
        .style('font-size', '14px')
        .style('fill', 'white');
})
