import watches from './app.js';


/*
const x = d3.scaleTime().range([0,width]);
const y = d3.scaleLinear().range([height,0])
*/
/*
const svg = d3.selectAll(".d3_miniGraph")
.append("svg")
.attr("width", "100%")
.attr("height", "100%")
.append("g")


const dataset = [
    { date: new Date("2022-01-01"), value: 200 },
    { date: new Date("2022-02-01"), value: 400 },
    { date: new Date("2022-03-01"), value: 800 },
    { date: new Date("2022-04-01"), value: 1600 },
    { date: new Date("2022-05-01"), value: 2400 },
    { date: new Date("2022-06-01"), value: 5000 },
    { date: new Date("2022-07-01"), value: 3000 },
    { date: new Date("2022-08-01"), value: 1000 },
    { date: new Date("2022-09-01"), value: 1400 },
    { date: new Date("2022-10-01"), value: 1000 },
    { date: new Date("2022-11-01"), value: 400 },
    { date: new Date("2022-12-01"), value:  700 }
  ];

  */
  /*

    //define the x and y domains
    x.domain(d3.extent(dataset, d => d.date))
    //basically minimum and maxium date.

    y.domain([0, d3.max(dataset, d => d.value)])
    //basically [0, to max]

    */
    /*

  svg.append("path")
  .datum(dataset)
  .attr("fill", "none")
  .attr("stroke", "purple")
  .attr("stroke-width", 1)
  .attr("d", line);
*/

function activateCharts(arr){

const width = 100;
const height = 50;


arr.forEach((watch)=>{
const svg = d3.select(`.${watch.name.replace(/\s/g, '')}`)
.append("svg")
.attr("width", "100%")
.attr("height", "100%")
.append("g")
.attr("transform", `translate(0, 25)`); // Move to the bottom


d3.csv(`https://raw.githubusercontent.com/JoshuaPoon1/Watchfolio.app/main/watchfolio-project/data/${watch.name.replace(/\s/g, '').toLowerCase()}.csv`,
function(d){
    return {
     date : d3.timeParse("%Y-%m-%d")(d.date),
     value : d.value 
    }
},
function(data){
    const x = d3.scaleTime()
    .domain(d3.extent(data,  function(d) { return d.date; }))
    .range([0,width]);

    const y = d3.scaleLinear()
    .domain([0,d3.max(data, function(d) { return d.value; })])
    .range([height,0])

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#301934")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
}
)
}
)
}



export default {activateCharts};

    // access the api using ?${watch.name}

    /*

    for loop that loops through watch array then uses watch.name to locate which 
    csv file and then compiles graph



    */

    











