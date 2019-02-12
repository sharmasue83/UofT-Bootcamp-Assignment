// from data.js


/*
var tableData = data;
//console.log(data);

// YOUR CODE HERE!
// create a variable to select a table body
var tbody = d3.select("tbody");




//for each element in tableData, create a function in which parameter of the function prints each element of tableData.
tableData.forEach(function(ufo_data){
    //console.log(ufo_data);

    //Create a row for each element in tableData.
    //for each element of the table data, append a row in table body.

    var row = tbody.append("tr");

//Object.entries method returns an array of the the given object's own enumerable property[key,value] pairs in the same order as that of the prototype chain.

// const object2 = { 0: 'a', 1: 'b', 2: 'c' };
// console.log(Object.entries(object2)[2]);

    Object.entries(ufo_data).forEach(function([key,value]){
        //console.log(key,value);

        //now append the tbody with td for each key,value pair in the ufo.data
        var cell = tbody.append("td");

        //the value in the cell is text
        cell.text(value);
    });
});
*/


var tableData = data;

//Select the submit button
 var submit_btn = d3.select("#filter-btn");

 // add event listener with windows as windows needs to be reloaded with filtered vlues.

 window.addEventListener('load', () => {showTable(tableData)});
 submit_btn.on("click",handleClick);
 
 // crate a handle click function that will respond to the event listener click.
 function handleClick() {
//Prevent page from refreshing
    d3.event.preventDefault();
//select the datetime input element.
    var inputElement = d3.select("#datetime");

    console.log(inputElement);

//select the property value of th einput property
    var inputValue = inputElement.property("value");
    console.log(inputValue);
//filter the data based on input value
    filteredData = tableData.filter(info => info.datetime === inputValue);

    showTable(filteredData);

 };

    //console.log(filteredData);
//Create a shoeTable funtion that will select the values based on input value
    function showTable(input_value) {
        //select the tabel body
        var tbody = d3.select("tbody");
        //empty the table body
        tbody.html("");
        //for each value of the filtered data 

        input_value.forEach(function(Date_Row){ 
            //append the tr-row
            var row = tbody.append("tr");

            //for each key, value pair

            Object.entries(Date_Row).forEach(function([key,value]){

                //append a cell-td to the tr-row with each value of the key
                var cell = tbody.append("td");

                cell.text(value);
            });
        });
    };

    //var country = filteredData.map(info => info.Country);
    //console.log(country);

 


