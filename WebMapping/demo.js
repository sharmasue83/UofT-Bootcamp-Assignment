//Creating map object

var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom:6
});

//Add tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);



//Link to geoJSON

var API_Link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";


console.log(API_Link);
function get_color(d) {
  if (d >= 5.0)
    return "#FF0000";
  if (d >= 4.0)
    return "#FF6600";
  if (d >= 3.0)
    return "#FF9900";
  if (d >= 2.0)
    return "#FFFF33";
  else
    return "#99FF66";
};
//var geojson;

// Grab data with d3
d3.json(API_Link, function(data) {
  var geojsonMarkerOptions = {
    radius: feature.properties.mag*3,
    fillColor: get_color(feature.properties.mag),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,geojsonMarkerOptions)
    }, 
    onEachFeature: function (feature,layer) {
      layer.bindPopup('<h4>'+feature.properties.place+'</h4><p>Magnitude: '+feature.properties.mag+'</p>')
    }
  })
.addTo(myMap)
});

    


    
    

    // Create a new geojson layer
    

        
  
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

    

      



      