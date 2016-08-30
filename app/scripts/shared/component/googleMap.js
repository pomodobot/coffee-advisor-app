class GoogleMap {
  constructor(element, center) {
    this.map = new google.maps.Map(element, {
      center: center,
      zoom: 10,
      draggable: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false
    });
    this.markers = [];

    this.addMarker({
      position: center,
      title: "My location"
    });
    this.fitBounds();
  }

  fitBounds() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.markers.length; i++) {
      bounds.extend(this.markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
  }

  addMarker(markerData) {
    var marker = new google.maps.Marker({
      position: markerData.position,
      map: this.map,
      title: markerData.title
    });
    this.markers.push(marker);

    if (markerData.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: markerData.content
      });
      marker.addListener('click', function () {
        infoWindow.open(this.map, marker);
      });
    }
    return marker;
  }
}

module.exports = GoogleMap;
