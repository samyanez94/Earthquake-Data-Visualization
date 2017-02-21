let map;
let infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: new google.maps.LatLng(28.7, -15.0),
        mapTypeId: "terrain"
    });

    map.data.loadGeoJson("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson");

    map.data.setStyle((feature) => {
        let magnitude = feature.getProperty("mag");
        return {
            icon: getCircle(magnitude)
        };
    });

    map.data.addListener("click", (event) => {
        if (infowindow) {
            infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({
            content: event.feature.getProperty("place")
        });
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
    });

    function getCircle(magnitude) {
        return {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "red",
            fillOpacity: .2,
            scale: Math.pow(2, magnitude) / 2,
            strokeColor: "white",
            strokeWeight: .5
        };
    }
}
