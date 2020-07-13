# leaflet-challenge
Visualizing Data with Leaflet
Geomapping

A map was created to visualize earthquake data.

-First, a basic map was created.

-Then, a tile layer was added to the map.

-Next, the GeoJSON data was stored in a variable.

-After that, D3 was used to read the GeoJSON data into the map and a function was called to create markers that visualized earthquake observations.

-The function utilized an inner function to add popups to the markers containing descriptive data like magnitude, location, and date/time.

-Then the data was passed to the GeoJSON function in Leaflet which pulled in the popups and utilized conditionals to return markers as circles with colors & radii proportional to earthquake magnitude values.

-Finally, a legend was added to the bottom left of the map, with colors corresponding to different magnitude ranges.
