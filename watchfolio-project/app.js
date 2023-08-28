const filterBy = document.querySelector(".select-filter");
const ranking = document.querySelector("tbody");
const searchBar = document.querySelector(".search-bar");
const searchForm = document.querySelector(".search-form")
const autosuggestionList = document.querySelector(".autosuggestion-list");

import watches from "./watches.js"
import func from "./LPgraph.js"


//we need to read api to store each object accordingly.
/*
const testApi = await fetch("www.watchfolio.app/api/v1/watches")
//should return an array of watches

*/

/*for loop and push each watch.
watches.push(seamaster, speedmaster, daytona);
*/



class app {
  
  constructor() {
    filterBy.addEventListener("change", this._injectHtml);
    searchBar.addEventListener("keyup", this._autoSuggest.bind(this));
    searchForm.addEventListener("submit",this._loadPage())
    this._injectHtml();
  }

  _injectHtml() {
    let filter = filterBy.value;
    ranking.innerHTML = ""; //clear everything.
    function helpMeSort(arr) {
      let html = arr.map((watch, index) => {
          return `
      <tr>
        <td>${index + 1}</td>
        <td><a href = "watchPage.html?watch=${watch.name.replace(/ /g, '_')}" class="redirect" }>${watch.name}</a></td>
        <td>${watch.ref}</td>
    
        <td>${watch.prodDate}</td>
        <td>$${watch.price}</td>
      
        <td>${watch.svn}%</td>
        <td>${watch.thrd}%</td>
        <td>${watch.yr}%</td>
        
        <td class="padding_zero"><div class="d3_miniGraph ${watch.name.replace(/\s/g, '')}"></div></td>
      </tr>`;
        }).join("");
      ranking.insertAdjacentHTML("beforeend", html);
    }

    if (filter == "omega" || filter == "rolex") {

      let brandFiltered = watches.filter((watch) => watch.type.toLowerCase() === filter);
      helpMeSort(brandFiltered);
      func.activateCharts(brandFiltered)
     
    }
    if (filter == "price") {
      let arr = watches.sort((a, b) => b.price - a.price);
      helpMeSort(watches);
      func.activateCharts(watches)

    }
    if (filter == "biggestGainers") {
      let biggestGainers = watches.slice().sort((a, b) => b.yr - a.yr)
      helpMeSort(biggestGainers);
      func.activateCharts(biggestGainers)
     
    }
    if (filter == "biggestLosers") {
      let biggestLosers = watches.slice().sort((a,b)=> a.yr - b.yr)
      helpMeSort(biggestLosers);
      func.activateCharts(biggestLosers)

      //sort by losers
    }

  }

  _autoSuggest() {
    this._clear();
    watches.forEach((watch) => {
      if (watch.name.toLowerCase().startsWith(searchBar.value.toLowerCase()) && searchBar.value != "") {
        let htmlString = `<li class="list"><b>${watch.name.substring(0,searchBar.value.length)}</b>${watch.name.substring(searchBar.value.length, watch.length)}</li>`;
        autosuggestionList.insertAdjacentHTML("beforeend", htmlString);
      }
    });

    this._listenToClick();
  }

  _listenToClick(){
    let listElements = document.querySelectorAll(".list");

    listElements.forEach(list => {
      list.addEventListener("click", function(){
        searchBar.value = "";
        searchBar.value = this.textContent;
        autosuggestionList.innerHTML = "";


      window.location.href = `watchPage.html?watch=${this.textContent.replace(/ /g, "_")}`;

      })

    })
  }
  //helper
  _clear() {
    autosuggestionList.innerHTML = "";
  }

  _loadPage(){
    console.log("load")
  }

}

const myApp = new app();

export default watches;