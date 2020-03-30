// import the data from data.js
const tableData = data;

// reference the html table using d3
var tbody = d3.select("tbody");

// create function to build a table
function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}


// Keeping track of all filters (date/city/state/country/shape) 
var filters = {};

// This function will update the filters dictionary as per the user input
function updateFilters() {

  // Save the element, value, and id of the filter that was changed by user
  let date = d3.select("#date").property("value");
  
  let city = d3.select("#city").property("value");

  let state = d3.select("#state").property("value");

  let country = d3.select("#country").property("value");

  let shape = d3.select("#shape").property("value");

   
  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  filters = {};
  
  if (date) {
    filters["datetime"] = date;       
  }
  
  if (city) {    
    filters["city"] = city;    
  }
  
  if (state) {
    filters["state"] = state;    
  }
  
  if (country) {    
    filters["country"] = country;    
  }
  
  if (shape) {
    filters["shape"] = shape;    
  }
     
  // Call function to apply all filters and rebuild the table
  filterTable();
}

// function to filter the data based on the above filters and 
//create a new filtered table based on these filters
function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;
  // Loop through all of the filters and keep any data that
  // matches the filter values
   
  for (var key in filters) {    
    
    filter1 = filteredData.filter(row => row[key] === filters[key] );
    
  filteredData = filter1;
  } 
  
  // Finally, rebuild the table using the filtered Data
   buildTable(filter1);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis

d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);












