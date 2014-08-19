
var dataset = [55, 33, 15, 10, 3];
var companies = ["AAPL", "GOOG", "WU", "YHOO", "REST"];
var dateVals = [54, 41, 15, 10, 8];
var dates = ["2012-12-22", "2010-10-02","2012-05-17", "2011-03-29", "2014-08-06"];






function extractCompanies(dataset, companies){
  var dataSetNew = [];
var restDataset = [];
var companiesNew = [];
var restCompanies = [];

  var sum = 0;
  var sumArr1 = sumArr(dataset);
  //var dataSetNew = [];
  for(var i=0; i<dataset.length; i++){
    if(sum/sumArr1>=0.95 || i>8){
      restDataset.push(dataset[i]);
      restCompanies.push(companies[i]);
      sum+=dataset[i];
    } else {
      dataSetNew.push(dataset[i]);
      companiesNew.push(companies[i]);
      sum+=dataset[i];
    }
  }
  companiesNew.push("Rest");
  dataSetNew.push(sumArr(restDataset));
  return [dataSetNew, companiesNew, restDataset, restCompanies];
}




function extractDates(dateValues, dates){
  var dateValsNew = [];
var restDateValsset = [];
var datesNew = [];
var restDates = [];
  var sum = 0;
  var sumArr1 = sumArr(dateValues);
  var dataSetNew = [];
  for(var i=0; i<dateValues.length; i++){
    if(sum/sumArr1>=0.9 || i>5){
      restDateValsset.push(dateValues[i]);
      restDates.push(dates[i]);
      sum+=dateValues[i];
    } else {
      dateValsNew.push(dateValues[i]);
      datesNew.push(dates[i]);
      sum+=dateValues[i];
    }
  }
  return [dateValsNew, datesNew, restDateValsset, restDates];
  
}

function show1(dataset, companies) {
  extractCompanies(dataset, companies);
  for(var i=0; i<datasetNew.length; i++){
    document.write("DATA " + datasetNew[i]+"\n");
    document.write('</br>');
    document.write("Company " + companiesNew[i] +"\n");
    document.write('</br>');
  }
  for(var i=0; i<restDataset.length; i++){
    document.write("Rest DATA " + restDataset[i]+"\n");
    document.write('</br>');
    document.write("Rest Company " + restCompanies[i] +"\n");
    document.write('</br>');
  }
}

function show2(dateVals, dates) {

  extractDates(dateVals, dates);

  for(var i=0; i<dateValsNew.length; i++){
    document.write("DATA " + dateValsNew[i]+"\n");
    document.write('</br>');
    document.write("Date " + datesNew[i] +"\n");
    document.write('</br>');
  }
  for(var i=0; i<restDateValsset.length; i++){
    document.write("Rest DATA " + restDateValsset[i]+"\n");
    document.write('</br>');
    document.write("Rest date " + restDates[i] +"\n");
    document.write('</br>');
  }
}




function sumArr (array){
  var s=0;
  for(var i=0; i<array.length; i++){
    s+=array[i];
  };
  return s;
  // return array.reduce(function(pv, cv) { return pv + cv; }, 0);
}

function createColorSet (dataset, colorSet, intensity){
  var maxBarHeight = dataset[0];
  if(colorSet[1]<=colorSet[0]){
    var colorvaRed = Math.round(colorSet[1]+(intensity * (colorSet[0]-colorSet[1]))/maxBarHeight);
  } else {
    var colorvaRed = Math.round(colorSet[1]-(intensity * (colorSet[1]-colorSet[0]))/maxBarHeight);
  }
  if(colorSet[3]<=colorSet[0]){
    var colorvalGreen = Math.round(colorSet[3]+(intensity * (colorSet[2]-colorSet[3]))/maxBarHeight);
  } else {
    var colorvalGreen = Math.round(colorSet[3]-(intensity * (colorSet[3]-colorSet[2]))/maxBarHeight);
  }
  if(colorSet[5]<=colorSet[4]){
    var colorvalBlue = Math.round(colorSet[5]+(intensity * (colorSet[4]-colorSet[5]))/maxBarHeight);
  } else {
    var colorvalBlue = Math.round(colorSet[5]-(intensity * (colorSet[5]-colorSet[4]))/maxBarHeight);
  }
  return "rgb("+colorvaRed+", "+colorvalGreen+", " + colorvalBlue + ")";
}

 


function createSVG(companiesValues, companiesNames, dateNames, dateValues, colorSet, num){
var resultComp = extractCompanies(companiesValues, companiesNames);
var resultDate = extractDates(dateValues, dateNames);

  var dataset = resultComp[0];
  var companies = resultComp[1];
  var dateData = resultDate [0];
  var dateVals = resultDate [1];

  var restCompValues = resultComp[2];
  var restCompNames = resultComp[3];
  var restDateValues = resultDate[2];
  var restDateNames = resultDate[3];

 var width = 1360;
 // var width = $(document).width();
  var CompaniesWidth = 0.7*width;
  var DateWidth = 0.3*width;
  
  var height = 300;
  var barPadding = 5;
  var labelHeight = 40;
  var maxBarHeight = dataset[0]*(height-labelHeight)/height;
  var maxDateWidth = dateVals[0];

  

  var svgC = d3.select("body")
                .append("svg");
  var svg0 = svgC.append("svg");
  var svg1 = svgC.append("svg");

  svgC.attr("width", width)
      .attr("height", height+40);

  svg0.attr("width", width)
      .attr("height", 40);

  svg0.append("text")
      .attr("x", 0.7*width/2)
      .attr("y", 23)
      .text("Companies")
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "30px")
       .attr("fill", "rgb(80,80,80)");

svg0.append("text")
      .attr("x", 0.7*width+0.3*width/2)
      .attr("y", 23)
      .text("Date")
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "25px")
      .attr("fill", "rgb(80,80,80)");

      //linije ispod labela
  // svg0.append("rect")
  //     .attr("width", 180)
  //     .attr("height", 2)
  //     .attr("x", 0.7*width/2-90)
  //     .attr("y", 30)
  //     .attr("fill", "teal");

  // svg0.append("rect")
  //     .attr("width", 100)
  //     .attr("height", 2)
  //     .attr("x", 0.7*width+0.3*width/2-50)
  //     .attr("y", 30)
  //     .attr("fill", "teal");
 

  svg1.attr("width", width)
  .attr("height", height)
  .attr("y", 40)
  .attr("id", "main"+num)
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i){
    return i*(CompaniesWidth/dataset.length);
  })
  .attr("y", function(d){
    return (height-labelHeight) - (d*(height-labelHeight)/maxBarHeight)*(height-labelHeight)/height;
  })
  .attr("width", CompaniesWidth/dataset.length - barPadding)
  .attr("height", function(d){
    return (d*(height-labelHeight)/maxBarHeight)*(height-labelHeight)/height;
      // d*height/maxBarHeight-labelHeight;
    })
  .attr("fill", function(d) {
    return createColorSet(dataset, colorSet, d);
  });

  var textL = svg1.selectAll("text")
  .data(companies)
  .enter()
  .append("text")
  // .text(function(d,i){
    
  //  return d+" (" + +(dataset[i]*100/sumArr(dataset)).toFixed(1)+"%)";
  // })
  .attr("x", function(d, i){
   return i*(CompaniesWidth/dataset.length)+(CompaniesWidth/dataset.length)/2;
 })
  .attr("y", function(d){
    return height;
  })
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "black");
  
  textL.append("tspan")
  .attr("x", function(d, i){
   return i*(CompaniesWidth/dataset.length)+(CompaniesWidth/dataset.length)/2;
 })
  .attr("y", function(d){
    return height - labelHeight + 15;
  })
  .text(function(d){
     return getFullName(d).substring(0,14);
  });
  textL.append("tspan")
  .attr("x", function(d, i){
   return i*(CompaniesWidth/dataset.length)+(CompaniesWidth/dataset.length)/2;
 })
  .attr("y", function(d){
    return height- 10;
  })
  .text(function(d,i){
     return " (" + +(dataset[i]*100/sumArr(dataset)).toFixed(1)+"%)";
  });

  // textL.append("tspan")
  // .attr(y,)
  // .text("dddvghghjhjh");
  // textL.append("tspan")
  // .text("dcc");





  var svg2 = svg1.append("svg");


  svg2.attr("width", DateWidth)
  .attr("height", height)
  .attr("fill", "black")
  .attr("x", CompaniesWidth);

  var horBarHeight = 35;
  var topOffset = (height - (dateVals.length * horBarHeight))/2;

  svg2.selectAll("rect")
  .data(dateVals)
  .enter()
  .append("rect")
  .attr("x", barPadding)
  .attr("y", function(d,i){
   return topOffset+i*horBarHeight;
 })
  .attr("width", function(d){
    return d*DateWidth/maxDateWidth*3/5;
  })
  .attr("height", horBarHeight - barPadding)
  .attr("fill", function(d) {
    return createColorSet(dateVals, colorSet, d);
  });

  svg2.selectAll("text")
  .data(dateData)
  .enter()
  .append("text")
  .text(function(d,i){
    return formatDate(d);
          // +" (" + +(dates[i]*100/sumArr(dates)).toFixed(1)+"%)";
        })
  .attr("x", function(d, i){
    return (dateVals[i])*DateWidth/maxDateWidth*3/5+15;
  })
  .attr("y", function(d,i){
    return topOffset+i*horBarHeight+ horBarHeight/2 ;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "14px")
  .attr("fill", "black");





  createRest(height, svg1, restCompValues,restCompNames, colorSet, num);


}

function createRest(height, svgParent, restCompValues,restCompNames, colorSet, num){
 d3.select("body")
 .selectAll("tspan")
 .filter(function(d){
  return d=="Rest";
 })
//  .on("mouseover", function(){
//   this.style.cursor="pointer";
//   d3.select(this)
//           .attr("fill", "teal");
//  })
//  .on("mouseout", function(d) {
//         d3.select(this)
//       .attr("fill", "rgb(0, 0, 0)");
// })
//  .on("click", function(){
//   expand(height, restCompValues.length,num);
//  });

//restCompValues = [180,177,155,149,147,146,106,92,85,80,69,63,58,10,5];
var maxRest = restCompValues[0];

 var restSVG = svgParent.append("svg")
 .attr("height", height+Math.ceil(restCompValues.length/10)*height)
 .attr("id", "rest"+num);
 var newHeight = height*0.85;

restSVG.selectAll("rect")
.data(restCompValues)
.enter()
 .append("rect")
  .attr("x", function(d,i){
    return (i%10)*100;
  })
  .attr("y", function(d, i){
    
    return (2*height+height*Math.floor(i/10))-(height - newHeight)-d*newHeight/maxRest;
  })
  .attr("width", 90)
  .attr("height", function(d){
    
    return d*newHeight/maxRest;
  })
    .attr("fill", function(d){
      return createColorSet(restCompValues, colorSet, d)
    });

var textRest = restSVG.selectAll("text")
  .data(restCompNames)
  .enter()
  .append("text")
  .attr("x", function(d,i){
    return (i%10)*100+45;
  })
  .attr("y", function(d,i){
    return 2*height+height*Math.floor(i/10);
  })
  .text(function(d){
    // return d;
  })
  .attr("text-anchor", "middle");


  textRest.append("tspan")
  .attr("x", function(d,i){
    return (i%10)*100+45;
  })
  .attr("y", function(d,i){
    return 2*height+height*Math.floor(i/10)-height*0.08;
  })
  .text(function(d){
    var dd = getFullName(d);
     return dd;

  })

   textRest.append("tspan")
  .attr("x", function(d,i){
    return (i%10)*100+45;
  })
  .attr("y", function(d,i){
    return 2*height+height*Math.floor(i/10)-height*0.01;
  })
  .text(function(d,i){
     return " (" + +(restCompValues[i]*100/sumArr(restCompValues)).toFixed(1)+"%)";
  })

}

function expand(height, numVals,num){
  var newHeight = height + Math.ceil(numVals/10)*height;
   


  if(d3.select("body").select("#rest"+num).attr("height") == height){
    d3.select("body").selectAll("svg").attr("height", newHeight);
  }else{
    d3.select("body").selectAll("svg").attr("height", height);
  }
  
}


function returnColorset(num){
  var colorsets = [ [51,255,51,238,51,153],
                    [10,255,125,180,53,4],
                    [19,229,31,130,44,100],
                    [115,220,39,220,89,220],
                    [28,244,28,244,12,36],
                    [83,224,10,127,21,21],
                    [0,145,0,242,110,157],
                    [255,97,190,97,90,97]];

  for (var i = colorsets.length; i >= 0; i--) {
    return colorsets[num%i];
  };
}

// function showGradients(){
//   var colorsets = [[51,255,51,238,51,153],[10,193,125,250,53,127],[19,184,31,210,44,221]
//   ,[115,237,39,175,89,170],[28,244,28,244,12,36],[83,224,10,127,21,21],[0,125,0,125,110,180]
//   ,[255,147,128,147,0,147]];

//   for (var i = 0; i <= colorsets.length; i++) {
//     document.write("SET "+i);
//    var svg = d3.select("body").append("svg")
//           .attr("y",i*200+20)
//         // .attr("width", 700)
//         // .attr("height", 300);
//    svg.append("rect")
//       .attr("height", 200)
//       .attr("width", 100)
//       // .attr("x",20)
//       // .attr("y",i*200+20)
//       .attr("fill", "rgb("+colorsets[i][0]+","+colorsets[i][2]+","+colorsets[i][4]+")");

//       svg.append("text")
//           // .attr("x",20)
//           .attr("y",50)
//           .text("("+colorsets[i][0]+","+colorsets[i][2]+","+colorsets[i][4]+")");


//       svg.append("rect")
//       .attr("height", 200)
//       .attr("width", 100)
//        .attr("x",100)
//       // .attr("y",i*200+20)
//       .attr("fill", "rgb("+colorsets[i][1]+","+colorsets[i][3]+","+colorsets[i][5]+")");

//       svg.append("text")
//            .attr("x",70)
//           .attr("y",70)
//           .text("("+colorsets[i][1]+","+colorsets[i][3]+","+colorsets[i][5]+")");
//   };
// }

// var colorSet1 = [51,255,51,238,51,153];
// var colorSet2 = [10,193,125,250,53,127];
// var colorSet3 = [19,184,31,210,44,221];
// var colorSet4 = [115,237,39,175,89,170];
// var colorSet5 = [28,244,28,244,12,36];
// var colorSet6 = [83,224,10,127,21,21];
// var colorSet7 = [0,125,0,125,110,180];
// var colorSet8 = [255,147,128,147,0,147];




function createHeading(index){
  var margin = 20;

  var width = $(document).width();
  var height = 150;
  var stickerWidth = 400;
  var stickerHeight = 0.6*height;
  var stickerSkewHeight = 0.33*height;

  //za odmicanje
  d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", margin);

 

  var svgH = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

  // svgH.append("rect")
  //     .attr("width", width)
  //     .attr("height", 80)
  //     .attr("fill", "rgb(205,200,200)");

  svgH.append("polygon")
      .attr("points", ""+(width - stickerWidth)/2+","+
                      (height - stickerHeight - stickerSkewHeight)/2+","+
                      (width + stickerWidth)/2+","+
                      (height - stickerHeight - stickerSkewHeight)/2+","+
                      (width + stickerWidth)/2+","+
                      (height + stickerHeight - stickerSkewHeight)/2+","+
                      (width/2)+","+
                      (height - (height - stickerHeight - stickerSkewHeight)/2)+","+
                      (width - stickerWidth)/2+","+
                      (height + stickerHeight - stickerSkewHeight)/2+"")

        // "10,0,300,0,350,30,350,50,300,80,10,80")
      .attr("fill", "rgb(255,207,0)");

   

  svgH.append("text")
      .attr("x", width/2)
      .attr("y", 55)
      .text("Feature")
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "38px")
      .attr("fill", "rgb(40,40,40)");

  svgH.append("text")
      .attr("x", width/2)
      .attr("y", 115)
      .text(index)
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "55px")
      .attr("fill", "rgb(40,40,40)");

      d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", margin);
}


  var names = { "RDS": "Royal Dutch Shell",
                "XOM":  "Exxon Mobil Corporation",
                "SNP":  "China Petroleum & Chemical Corporation",
                "SHI":  "Sinopec Shanghai Petrochemical Company Limited",
                "BP":   "British Petroleum",
                "TOT":  "TOTAL S. A.",
                "CVX":  "Chevron Corporation",
                "E":    "Eni",
                "PBR":  "Petrobras- Petroleo Brasileiro S.A.",
                "VLO":  "Valero Energy",
                "STO":  "Statoil",
                "AAPL": "Apple",
                "LPL":  "LG",
                "T":    "AT&T",
                "HPQ":  "Hewlett-Packard",
                "IBM":  "IBM",
                "NOK":  "Nokia",
                "CAJ":  "Canon",
                "MSI":  "Motorola Solutions",
                "SNE":  "Sony",
                "PHG":  "Philips",
                "INTC": "Intel",
                "AMD":  "AMD",
                "MSFT": "Microsoft",
                "ORCL": "Oracle",
                "SAP":  "SAP SE",
                "SYMC": "Symantec",
                "VMW":  "VMware",
                "ADBE": "Adobe Systems",
                "FISV": "Fiserv",
                "INTU": "Intuit",
                "CSCO": "Cisco Systems",
                "GOOG": "Google",
                "ERIC": "Ericsson",
                "ADSK": "Autodesk",
                "RHT":  "Red Hat",
                "AMZN": "Amazon.com",
                "NFLX": "Netflix",
                "BIDU": "Baidu",
                "VOW":  "Volkswagen Group",
                "TM":   "Toyota Motor Corporation",
                "GM":   "General Motors",
                "F":    "Ford Motor Company",
                "NSANY":"Nissan Motor Corporation",
                "HMC":  "Honda Motor Company  ",       
                "PEP":  "PepsiCo Inc.",
                "TSN":  "Tyson Foods Inc.",
                "BUD":  "Anheuser-Busch InBev",
                "KRFT": "Kraft Foods",
                "KO":   "Coca-Cola",
                "DPS":  "Dr. Pepper Snapple Group",
                "MCD":  "McDonald's Corporation",
                "HSBC": "HSBC Holdings",
                "MTU":  "Mitsubishi UFJ Financial Group",
                "JPM":"JPMorgan Chase & Co",
                "BCS":  "Barclays PLC",
                "DB":   "Deutche Bank AG",
                "C":    "Citigroup INC",
                "MFG":  "Mizuho Financial Group",
                "RBS":  "Royal Bank of Scotland Group",
                "SAN":  "Banco Santander",
                "SMFG": "Sumitomo Mitsui Financial Group",
                "JNJ":  "Johnson & Johnson",
                "PG":   "The Procter & Gamble",
                "WMT":  "Wal-Mart Stores",
                "DIS":  "The Walt Disney Company",
                "NKE":  "Nike",
                "LYG":  "Lloyds Banking Group",
                "BAC":  "Bank of America",
                "WFC":  "Wells Fargo & Co",
                "Rest": "Rest"}

 function getFullName (shortName){
      if(names[shortName] != null){
        return names[shortName];
      } else {
        return shortName;
      }
      
}


function makeLinks(){

 for (var key in names) {
     $("body").append("<a href=http://ichart.yahoo.com/table.csv?s="+key+"&a=9&b=5&c=2010&d=6&e=7&f=2012&g=w&ignore=.csv>"+key+" - "+names3[key]+"</a><br/>");
};

 



 // "http://ichart.yahoo.com/table.csv?s=COMP&a=9&b=5&c=2010&d=6&e=7&f=2012&g=w&ignore=.csv"
}


function formatDate(date){
  var day = date.substring(8,10);
  var month = date.substring(5,7);
  var year = date.substring(0,4);
  return day+"."+month+"."+year+".";

}











































 














// createSVG(dataset, companies, dates, dateVals, colorSet1);
// createSVG(dataset, companies, dates, dateVals, colorSet2);
// createSVG(dataset, companies, dates, dateVals, colorSet3);
// createSVG(dataset, companies, dates, dateVals, colorSet4);
// createSVG(dataset, companies, dates, dateVals, colorSet5);
// createSVG(dataset, companies, dates, dateVals, colorSet6);
// createSVG(dataset, companies, dates, dateVals, colorSet8);
// createSVG(dataset, companies, dates, dateVals, colorSet9);





// //first create you SVG or select it
// var svg = d3.select("#container").append("svg");

// //then append the defs and the pattern
// svg.append("defs").append("pattern")
//     .attr("width", 5)
//     .attr("height", 5);
