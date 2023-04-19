//SCATTER PLOT
function main(){

function scatterplot(){

    // Create SVG element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500);
  
    var margin = {top: 50, right: 50, bottom: 50, left: 50};
    var width = svg.attr("width") - margin.left - margin.right;
    var height = svg.attr("height") - margin.top - margin.bottom;
    
    var g = svg.append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Generate 100 random points
    var data = [];
    for (var i = 0; i < 100; i++) {
      var x = Math.floor(Math.random() * 500);
      var y = Math.floor(Math.random() * 500);
      data.push([x, y]);
    }
  
    // Create scales for x and y axis
    var xScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function(d) { return d[0]; })])
                   .range([0, width]);
    
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function(d) { return d[1]; })])
                   .range([height, 0]);
  
    svg.append('text')
       .attr('x', width/2)
       .attr('y', margin.top/2)
       .attr('text-anchor', 'middle')
       .style('font-family', 'Arial')
       .style('font-size', 20)
       .text('Scatterplot');
  
    g.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));
          
    g.append("g")
     .call(d3.axisLeft(yScale));
  
    // Add circles for each data point
    g.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", 2)
    .attr("fill", "black");
  
  }
  


  //PIE CHART

  function createPieChart() {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const radius = Math.min(width, height) / 2.5;
  
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    const color = d3.scaleOrdinal(d3.schemeDark2);

    const pie = d3.pie()
    .value(function(d) { return d.total; })
    .sort(function() { return null; });

  
    const agegroups = ['0-16', '17-21', '22-30', '31-40', '41-50', '51-60', '61+'];
  
 
  
    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
  
    const label = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - 75);
  
    d3.csv("titanic.csv").then(data => {
      const groupData = d3.group(data, d => {
        if (+d.Age <= 16) {
          return '0-16';
        } else if (+d.Age <= 21) {
          return '17-21';
        } else if (+d.Age <= 30) {
          return '22-30';
        } else if (+d.Age <= 40) {
          return '31-40';
        } else if (+d.Age <= 50) {
          return '41-50';
        } else if (+d.Age <= 60) {
          return '51-60';
        } else {
          return '61+';
        }
      });
  
      const formattedData = agegroups.map(agegroup => {
        const match = groupData.get(agegroup);
        return { agegroup, total: match ? match.length : 0 };
      });
  
      const arcs = g.selectAll(".arc")
        .data(pie(formattedData))
        .join("g")
        .attr("class", "arc");
  
      arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.agegroup));
  
      arcs.append("text")
        .attr("transform", d => `translate(${label.centroid(d)})`)
        .text(d => d.data.agegroup);
  
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Titanic Passengers Distributed by Age")
        .attr("class", "title")
        .style("font-family", "Arial")
        .style("font-size", "24px");
    });
  }
  scatterplot();
  createPieChart();

}