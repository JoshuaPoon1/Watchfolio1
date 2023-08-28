import watches from './watches.js';


//select all html elements to dynamically render
const rank = document.querySelector(".rank")
const title = document.querySelector(".title")
const price = document.querySelector(".price")
const seven = document.querySelector(".seven")
const thirty = document.querySelector(".thirty")
const year = document.querySelector(".year")
const percentage = document.querySelectorAll(".percentage")

const modelYear = document.querySelector(".model_year")
const modelNo = document.querySelector(".modelNo")
const redOrGreen = document.querySelector(".stat")
const title1 = document.querySelector("title")
const img = document.querySelector(".logo")

img.addEventListener("click", ()=>{
  window.location.href = "index.html"
})



document.addEventListener('DOMContentLoaded', ()=>{

    const urlParams = new URLSearchParams(window.location.search);
    const watchName = urlParams.get('watch').replaceAll("_"," ");
    const watch = watches.filter((watch)=> watch.name == watchName)[0];
    //render HTML
    rank.textContent = `#${watch.rank}`
    title.textContent = watch.name;
    price.textContent = `$${watch.price}`
    seven.textContent = `${watch.svn}%`
    thirty.textContent = `${watch.thrd}%`
    year.textContent = `${watch.yr}%`
    redOrGreen.textContent = `${watch.yr>=0?"Overperform++":"Underperform--"}`
    if(redOrGreen.textContent == "Overperform++"){
      redOrGreen.classList.add("green-background-color")
    }
    else{
      redOrGreen.classList.add("red-background-color")

    }
    //redOrGreen.classList.add

    modelYear.textContent = watch.prodDate
    modelNo.textContent = `ref: ${watch.ref}`



    title1.textContent = watch.name;



    //add red or green color
    percentage.forEach((percentage)=>{
        if(percentage.textContent.startsWith("-")){
            percentage.classList.add("red")
        }
        else{
            percentage.classList.add("green")
        }
    })

    /* d3.js logic */

    const margin = {
        top: 70,
        right: 30,
        bottom: 40,
        left: 80
    }

    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(".graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.left + margin.right)
    .append("g")
    .attr("transform", `translate(${60},${30})`)




    d3.csv(`https://raw.githubusercontent.com/JoshuaPoon1/Watchfolio.app/main/watchfolio-project/data/${watch.name.replace(/\s/g, '').toLowerCase()}.csv`,
    function(d){
        return{
            date: d3.timeParse("%Y-%m-%d")(d.date),
            value : d.value
        }
    }).then(
        function(data) {

            // Add X axis --> it is a date format
            const x = d3.scaleTime()
              .domain(d3.extent(data, function(d) { return d.date; }))
              .range([ 0, width ]);


            svg.append("g")
              .attr("transform", `translate(0, ${height})`)
              .call(d3.axisBottom(x));
        
            // Add Y axis
            const y = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return +d.value; })])
              .range([ height, 0 ]);


            svg.append("g")
              .call(d3.axisLeft(y));
        
            // Add the line
            svg.append("path")
              .datum(data)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 3)
              .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
                )
        }
    )

})





/* make new js file for this!*/
const searchBar = document.querySelector(".search-bar")
const autosuggestionList = document.querySelector(".autosuggestion-list")


searchBar.addEventListener("keyup",suggest)

function suggest() {
  autosuggestionList.innerHTML = "";
  watches.forEach((watch) => {
    if (watch.name.toLowerCase().startsWith(searchBar.value.toLowerCase()) && searchBar.value != "") {
      let htmlString = `<li class="list"><b>${watch.name.substring(0,searchBar.value.length)}</b>${watch.name.substring(searchBar.value.length, watch.length)}</li>`;
      autosuggestionList.insertAdjacentHTML("beforeend", htmlString);
    }
  });

  const listElements = document.querySelectorAll(".list")
  listElements.forEach((list)=>{
    list.addEventListener("click",()=>{
      searchBar.value = "";
      searchBar.value = this.textContent;
      autosuggestionList.innerHTML = "";
      window.location.href = `watchPage.html?watch=${list.textContent.replace(/ /g, "_")}`;

    })
  })
}