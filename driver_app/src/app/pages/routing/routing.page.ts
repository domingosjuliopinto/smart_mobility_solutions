import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;
// import 'leaflet-draw';
var caricon = L.icon({
    iconUrl: '../../../assets/icon/car.png',
    iconSize: [30, 40],
  });

  var mapicon = L.icon({
    iconUrl: '../../../assets/icon/marker.png',
    iconSize: [30, 40],
  });
@Component({
  selector: 'app-routing',
  templateUrl: 'routing.page.html',
  styleUrls: ['routing.page.scss'],
})
export class RoutingPage {
  map: any;
  marker: any;

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    if(this.map) {
      this.map.remove();
    }
    this.map = L.map('map').setView([19.3689144, 72.8425589], 11);
    const mapLink =
      '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ', contribution',
      maxZoom: 18,
    }).addTo(this.map);

    this.marker = L.marker([19.2331943, 72.863352], { icon: caricon }).addTo(this.map);

    this.map.on('click', (e) => {
      const newMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: mapicon}).addTo(
        this.map
      );

      L.Routing.control({
				waypoints: [
          // L.marker([19.2282629,72.8632864],{icon: mapicon}).addTo(this.map)
					L.latLng(19.2282629,72.8632864),
					L.latLng(e.latlng.lat, e.latlng.lng)
				]
			}).on('routesfound', function (e) {
				var routes = e.routes;
				console.log(routes);

				e.routes[0].coordinates.forEach(function (coords, index) {
					setTimeout(function () {
            // this.marker.setZIndexOffset(1000);
						this.marker.setLatLng([coords.lat, coords.lng]);
					}, 100 * index)
				})

			}).addTo(this.map);
		});

    function createButton(label, container) {
      const btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    }

    this.map.on('click', (e) => {
      const container = L.DomUtil.create('div');
      const startBtn = createButton('Start from this location', container);
      const destBtn = createButton('Go to this location', container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(this.map);
    });
  }
}



