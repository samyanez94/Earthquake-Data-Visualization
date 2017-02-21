let map;

function initMap() {

    let infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: new google.maps.LatLng(28.7, -15.0),
        mapTypeId: "terrain"
    });

    map.data.loadGeoJson("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson");

    map.data.setStyle((feature) => {
        const magnitude = feature.getProperty("mag");
        return {
            icon: getCircle(magnitude)
        };
    });

    map.data.addListener("click", (event) => {
        infowindow.close();
        infowindow.setContent(contentString(event.feature));
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

    function contentString(feature) {
        const title = feature.getProperty("title");
        const date = new Date(feature.getProperty("time"));
        const url = feature.getProperty("url");

        return  '<div id="content">' +
                '<h1 id="firstHeading">' + title + '</h1>' +
                '<div id="bodyContent">' +
                '<p><b>Origin Time:\t</b>' + date + '</p>' +
                '<p><b>More Info:\t</b><a target="_blank" href="' + url +
                '">' + url + '</a></p>' +
                '</div></div>';
    }
}
