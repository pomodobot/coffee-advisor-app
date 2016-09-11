class GoogleMap {
  constructor(element, center) {
    this.map = new google.maps.Map(element, {
      zoom: 10,
      draggable: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      styles: [
        {
          "featureType":"all",
          "elementType":"all",
          "stylers": [
              {"saturation":-80}
          ]
        },
        {
          "featureType":"administrative.country",
          "elementType":"geometry.fill",
          "stylers":[
            {"visibility":"on"},
            {"hue":"#ff0000"}
          ]
        },
        {
          "featureType":"administrative.locality",
          "elementType":"geometry.stroke",
          "stylers":[
            {"visibility":"on"}
          ]
        },
        {
          "featureType":"administrative.locality",
          "elementType":"labels.text.fill",
          "stylers":[
            {"hue":"#25ff00"}
          ]
        },
        {
          "featureType":"landscape",
          "elementType":"labels",
          "stylers":[
            {"visibility":"off"}
          ]
        },
        {
          "featureType":"road.arterial",
          "elementType":"geometry",
          "stylers":[
            {"hue":"#00ffee"},
            {"saturation":50}
          ]
        }
      ]
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

  resize(){
    google.maps.event.trigger(this.map, "resize");
  }
}

module.exports = GoogleMap;
