//Creating map object

var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom:11
});

//Add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);



//Link to geoJSON

var API_Link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
console.log(API_Link);

var geojson;

// Grab data with d3
d3.json(API_Link, function(data) {

    function get_color(magnitude){
        return "#fff";
            }

    function get_radius(magnitude){
        return magnitude * 2;
    }

    console.log(features.properties.mag);


    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: get_color(features.properties.mag),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    

    // Create a new geojson layer
    L.geoJSON(data, {

        

        
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng,geojsonMarkerOptions);
            }
        }).addTo(myMap);

        
  
      // Define what  property in the features to use
      //valueProperty: "MHI",
  
      // Set color scale
     // scale: ["#ffffb2", "#b10026"],
  
      // Number of breaks in step range
     // steps: 10,
  
      // q for quartile, e for equidistant, k for k-means
      /*
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      }
      */
    //})

    });

      



      