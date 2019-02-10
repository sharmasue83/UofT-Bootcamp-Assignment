// from data.js
var tableData = data;

// YOUR CODE HERE!

var tableData = data;

var tbody = d3.select("tbody");
tableData.forEach(function(ufo_data){
    console.log(ufo_data);
    var row = tbody.append("tr");

    Object.entries(ufo_data).forEach(function([key,value]){
        console.log(key,value);
        var cell = tbody.append("td");
        cell.text(value);

    });
});


// find rows that return the data according to input value entered.'


var input_date = d3.select("label");

function date(){
    var find_data = input_data.value.trim().tolowerCase();

    report=tableData.filter(function(req_row){
        var date_info = req_row.date.tolowerCase();
        console.log(date_info);
        return date_info === find_data;
    })
}

function city() {
    var find_data = input_date.value.trim().tolowerCase();

    report = tableData.filter(function(req_row){
        var city_info = req_row.city.tolowerCase();
        console.log(city_info);
        return city_info === find_data;

    });
    
};

function state() {
    var find_data = input_date.value.trim().tolowerCase();

    report = tableData.filter(function(req_row){
        var state_info = req_row.state.tolowerCase();
        console.log(req_data.state);
        return state_info === find_data;

    });
    
};
function country() {
    var find_data = input_date.value.trim().tolowerCase();

    report = tableData.filter(function(req_row){
        var country_info = req_row.country.tolowerCase();
        console.log(country_info)
        return country_info === find_data;

    });
    
};

function shape() {
    var find_data = input_date.value.trim().tolowerCase();

    report = tableData.filter(function(req_row){
        var shape_info = req_row.shape.tolowerCase();
        return shape_info === find_data;
        console.log(shape_info);

    });
    
};
