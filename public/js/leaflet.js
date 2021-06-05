// Set Tile layer source and options
var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

// Initialize map //
var map = new L.Map('mymap').addLayer(OpenStreetMap_HOT).setView([41.640078, -100.463034], 2.5);

// Add the Locate search box //
var osmGeocoder = new L.Control.OSMGeocoder({
    placeholder: 'Search location...',
    collapsed: false
});

map.addControl(osmGeocoder);