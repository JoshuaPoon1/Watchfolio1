class watch {
    constructor(price, prodDate, svn, thrd, yr, name, type, ref) {
      this.price = price;
      this.prodDate = prodDate;
      this.svn = svn;
      this.thrd = thrd;
      this.yr = yr;
      this.type = type;
      this.name = this.type + " " + name;
      this.ref = ref
    }
  }
  
  let watches = [
  new watch(102662, 2023, -1.10, -3.0, 8.23, "Nautilus Moonphase", "Patek Philippe", "5726/1A"), //check
  new watch(29545, 2022, 1.2, 3.5, 12.43, "Daytona Panda", "Rolex", `116500LN`), //check
  new watch(24513, 2022, 1.0, 2.7, 5.6, "Royal Oak Offshore", "Audemars Piguet","26470ST" ), //check
  new watch(16843, 2022, -1.2, 2.9, -7.4, "Submariner Date Oystersteel Yellow Gold", "Rolex","126613LB"),//check
  new watch(14026, 2022, -1.2, -2.9, -7.4, "Submariner Date Black", "Rolex","126610LN"), //check
  new watch(52196, 2022, -1.5, -2.1, -5.8, "Royal Oak 50th", "Audemars Piguet", "15510ST"), //check
  new watch(22300, 2020, -1.5, -2.8, -6.1, "Silver Snoopy Award Speedmaster ", "Omega","310.32.42.50.02.001"), // check
  new watch(21687, 2023, -2.8, -3.5, -8.2, "Rolex GMT-Master II PEPSI", "Rolex","126710BLRO"), //check
  new watch(14518, 2023, 1.70, -3.22, 17.54,"Blue Dial Milguass","Rolex","116400GV"), //check
  new watch(6714, 2019, -3.0, -4.8, -9.1, "Santos Large Blue Dial", "Cartier","WSSA0030"), //check
  new watch(21973, 2022, 0.2, 1.4, 4.0, "Submariner Green", "Rolex","116610LV"),
  new watch(6843,2022,1.45,3.54,24.43,"Seamaster Toyko Edition","Omega","522.30.42.20.04.001"),
  new watch(13760, 2023, 1.8,2.1, 85.8, "Datejust Palm Dial", "Rolex","126200"),
  ];




  
  //add the ranks
  watches.sort((a,b)=> b.price - a.price).forEach((watch,index)=>{
    watch.rank = index+1
  })



  // instead of hard coding, read the csv file of the last and input it to the price. NEXTTTT

  export default watches;




