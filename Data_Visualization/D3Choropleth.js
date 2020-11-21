const eduUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const w = 1000;
const h = 600;
const padding = 80;

const svg = d3.select('#map')
            .append('svg')
            .attr('height', h)
            .attr('width', w);

let path = d3.geoPath();

let colorScale = d3.scaleThreshold()
                     .domain([0,10,20,30,40,50,60])
                     .range(d3.schemeYlGnBu[8]);

d3.queue()
  .defer(d3.json, countyUrl)
  .defer(d3.json, eduUrl)
  .await(ready);

function ready(error, county, edu) {
  
  const tooltip = d3.select('body')
                  .append('div')
                  .attr('id', 'tooltip')
                  .attr('class', 'rounded shadow-sm p-2 bg-light text-dark')
                  .style('opacity', 0);
  
  if (error) throw error
  svg.append('g')
     .selectAll('path')
     .data(topojson.feature(county, county.objects.counties).features)
     .enter()
     .append('path')
     .attr('class', 'county')
     .attr('d', path)
     .attr('fill', (d) => {
                            let arr = edu.filter((c) => c.fips === d.id)
                            return colorScale(arr[0].bachelorsOrHigher);
                          })
     .attr('data-fips', (d) => d.id)
     .attr('data-education', (d) => {
                                      let arr = edu.filter((c) => c.fips === d.id)
                                      return arr[0].bachelorsOrHigher;
                                    })
    .on('mouseover', (d) => {
                               let arr = edu.filter((c) => c.fips === d.id)
                               tooltip.transition().duration(200).style('opacity', 0.8);
                               tooltip.html(`<div>${arr[0].area_name} - ${arr[0].state}</div><div>Higher education: ${arr[0].bachelorsOrHigher}%</div>`)
                                      .style('left', `${d3.event.clientX + 20}px`)
                                      .style('top', `${d3.event.clientY + 20}px`)
                                      .style('class', 'bg-light text-dark');
                             })
     .on('mouseout', () => tooltip.transition().duration(300).style('opacity', 0));
  
  const legend = d3.select('#legend')
                   .append('svg')
                   .attr('height', 60)
                   .attr('width', w)
  
  legend.selectAll('squares')
        .data([0,10,20,30,40,50,60])
        .enter()
        .append('rect')
        .attr('x', (d, i) => 340 + i*40)
        .attr('y', 40)
        .attr('height', 20)
        .attr('width', 40)
        .style('fill', (d) => colorScale(d))
        
  legend.selectAll('text')
        .data([0,10,20,30,40,50,60])
        .enter()
        .append('text')
        .attr('x', (d, i) => 335 + i*40)
        .attr('y', 35)
        .text((d) => d + '%')
        .style('font-size', '14px')
        .style('fill', 'black')
}
