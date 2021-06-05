// Undefined variable
var marker;

// This functions adds a marker when the user clicks the map
function onMapClick(e) {
    // If a marker exits, remove it to avoid multiple markers
    if (marker) {
        map.removeLayer(marker);
    }

    // Define a new marker using click location
    marker = new L.marker(e.latlng).addTo(map).addTo(map);

    // Set form lat and lng values using marker's location
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lon').value = e.latlng.lng;
};

// Map listening for click event
map.on('click', onMapClick);