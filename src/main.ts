import * as d3 from "d3";

const app = document.querySelector('#app');
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const svgWidth = 1200;
const svgHeight = 800;
const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
}

const createBarChart = (data: []) => {
  console.log(data);

  const svg = d3
    .select(app)
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .attr('class', 'svg-container');

  const maxGDP = d3.max(data, (d) => d[1]);
  const minGDP = d3.min(data, (d) => d[1]);
  console.log(`maxGDP: ${maxGDP}\nminGDP: ${minGDP}`);

  const maxDate = d3.max(data, (d) => new Date(d[0]));
  const minDate = d3.min(data, (d) => new Date(d[0]));
  console.log(`maxDate: ${maxDate}\nminDate: ${minDate}`);

  // TypeScript Checking
  if (
    typeof maxGDP !== 'number' ||
    typeof minGDP !== 'number' ||
    typeof maxDate === 'undefined' ||
    typeof minDate === 'undefined'
  ) {
    return;
  }

  // Generate scales
  const xScale = d3
    .scaleTime()
    .domain([minDate, maxDate])
    .range([margin.left, svgWidth - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([minDate, maxDate])
    .range([margin.left, svgWidth - margin.right]);

  const heightScale = d3
    .scaleLinear()
    .domain([0, maxGDP])
    .range([0, svgHeight - margin.top - margin.bottom]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Create the axes

  svg
    .append('g')
    .call(xAxis)
    .attr('id', 'x-axis')
    .attr('tranform', `translate(0, ${svgHeight - margin.bottom})`);

  svg
    .append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('tranform', `translate(${margin.left}, 0)`);

}

fetch(url).then(res => res.json()).then(
  d => createBarChart(d.data)
);
