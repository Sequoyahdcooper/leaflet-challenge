//Create the Basic Map
var myMap = L.map("map", {
    center: [36.1699, -115.1398],
    zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

//Store the URL for the GeoJSON Data
var earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
console.log(earthquakes);

//Read the GeoJSON Data into the Map
d3.json(earthquakes, function(data) {
    console.log(data);
    //Call Function to Create Markers
    createFeatures(data);
});

//Create the Function to Create the Markers & Legend
function createFeatures (data) {
    console.log(data);
    //Create a Function to Add Popups
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<strong>Location: ${feature.properties.place}</strong>
            <hr><p>Date: ${new Date(feature.properties.time)}</p>
            <p>Magnitude: ${feature.properties.mag}</p>
            <p>Location: ${feature.geometry.coordinates.slice(0,2)}</p>
            <p>Alert: ${feature.geometry.alert}</p>
            <p>Felt: ${feature.geometry.felt}</p>
            <p>Gap: ${feature.geometry.gap}</p>`)
    };
    

    console.log(data)
    color = "";
    colorList = [];
     

    //Create Function to Store the Colors & Magnitude Values in Lists
    //Specify the Circle Color
    for (i=0; i<data.features.length; i++) {
        //Create an Empty Variable for Color
        color = "";
    
        if (data.features[i].properties.mag>0 && data.features[i].properties.mag<1) {
            color="purple";
        }
        else if (data.features[i].properties.mag>1 && data.features[i].properties.mag<2) {
            color="blue";
        }
        else if (data.features[i].properties.mag>2 && data.features[i].properties.mag<3) {
            color="green";
        }
        else if (data.features[i].properties.mag>3 && data.features[i].properties.mag<4) {
            color="yellow";
        }
        else if (data.features[i].properties.mag>4 && data.features[i].properties.mag<5) {
            color="orange";
        }
        else {
            color="red";
        };
        colorList.push(color);
    };
    console.log(colorList);
    //Method for Converting Basic Markers to Circles Found at https://leafletjs.com/examples/geojson/
    //Method for Handling L.circleMarker with Conditionals found at https://medium.com/geoman-blog/how-to-handle-circles-in-geojson-d04dcd6cb2e6
    L.geoJSON(data, {
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng) {
            if (feature.properties.mag<0) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "gray",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=0 && feature.properties.mag<1) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "purple",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=1 && feature.properties.mag<2) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "blue",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=2 && feature.properties.mag<3) {
               return  L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "green",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=3 && feature.properties.mag<4) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "yellow",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else if (feature.properties.mag>=4 && feature.properties.mag<5) {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "orange",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            }
            else {
                return L.circleMarker(latlng,
                    {color: 'white',
                    fillColor: "red",
                    radius: feature.properties.mag * 15,
                    opacity: 0.7,
                    fillOpacity: 0.7,
                    weight: 1}
                )
            };
        console.log(feature.properties.mag)}
    }).addTo(myMap);

    //Create a Function to Return Colors Based on Earthquake Magnitude
    //Method Found at https://gis.stackexchange.com/questions/133630/adding-leaflet-legend
    function getColors(mag) {
        return mag==='<0' ? 'gray':
                mag==='0-1' ? 'purple':
                mag==='1-2' ? 'blue':
                mag==='2-3' ? 'green':
                mag==='3-4' ? 'yellow':
                mag==='4-5' ? 'orange':
                                    'red';
    };

    //Create the Map Legend
    //Method Found at https://leafletjs.com/examples/choropleth/
    var legend = L.control({position: 'bottomleft'});

    //Call the Legend Code When the Legend gets Added to the Map
    legend.onAdd = function(map) {

        //Create a div to Store the Legend
        var div = L.DomUtil.create('div', 'legend');
        //Create the Labels for the Legend
        labels = [];
        //Create the Groups for the Legend
        groups = ['<0', '0-1', '1-2', '2-3', '3-4', '4-5', '5+'];
        
        //Loop through the Data and Add a Label for Each Colored Square
        for (var i = 0; i < groups.length; i++) {
            div.innerHTML += labels.push(`<strong><p style="background-color: ${getColors(groups[i])}; height: 30px; margin: -10px; padding: 0px;">${groups[i]}</p></strong>`);
        };
        div.innerHTML = labels.join('<br style="height: 0px">');
        return div;
    };
    legend.addTo(myMap);
};