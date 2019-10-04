function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel  
  // Use `d3.json` to fetch the metadata for a sample
  
  var url = `/metadata/${sample}`;

  // Fetch the JSON data and console log it
  d3.json(url).then(function(sampledata) {   
  });
 
  // Use d3 to select the panel with id of `#sample-metadata` 
  var sample_metadata = d3.select("#sample-metadata")
    // Use `.html("") to clear any existing metadata
    selector.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(sampledata).forEach(function ([key,value]){
      var row = sample_metadata.append("panel");
      row.text(`${key}: ${value}`);
         });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = `/samples/${sample}`;
    d3.json(url).then(function(plotdata) {   
   
      // NEED CODE 


    });
    // @TODO: Build a Bubble Chart using the sample data
    var xval = plotdata.otu_ids;
    var yval = plotdata.sample_values;
    var msize = plotdata.sample_values;
    var mcolor = plotdata.otu_ids;
    var tval = plotdata.otu_labels;

    var trace1 ={
      x:xval,
      y:yval,
      text:tval,
      mode:'markers',
      marker:{
        color:mcolor,
        size:msize
      }
    };
    var data = [trace1];

    var layout = {
      title: 'OTU ID'
      
     };

    Plotly.newPlot('bubble', data, layout);
    // // @TODO: Build a Pie Chart

    var data = [{
      values: [0, 1, 30, 40],
      labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
      type: "pie"
    }];
  
    var layout = {
      height: 600,
      width: 800
    };
  
    Plotly.plot("pie", data, layout);

    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
