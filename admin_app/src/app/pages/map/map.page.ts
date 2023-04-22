import { Component } from '@angular/core';
import * as L from 'leaflet';
// import 'leaflet-draw';
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
@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage {
  map: L.Map;

  constructor() {}

  ngOnInit() {
    // this.map = L.map('map', {
    //   center: [19.49308, 72.8550352],
    //   zoom: 15,
    //   renderer: L.canvas(),
    // });

    const map = L.map('map');
    // Initializes map

    map.setView([51.505, -0.09], 13);
    // Sets initial coordinates and zoom level

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    let marker, circle, zoomed;

    navigator.geolocation.watchPosition(success, error);

    function success(pos) {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
      }
      // Removes any existing marker and circule (new ones about to be set)

      marker = L.marker([lat, lng]).addTo(map);
      circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
      // Adds marker to the map and a circle for accuracy

      if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
      }
      // Set zoom to boundaries of accuracy circle

      map.setView([lat, lng]);
      // Set map focus to current user position
    }
    // L.control.locate().addTo(map);

    function error(err) {
      if (err.code === 1) {
        alert('Please allow geolocation access');
      } else {
        alert('Cannot get current location');
      }
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }
}

// import { Component } from '@angular/core';
// import * as L from 'leaflet';

//import 'leaflet-draw';
// @Component({
//   selector: 'app-map',
//   templateUrl: 'map.page.html',
//   styleUrls: ['map.page.scss'],
// })
// export class MapPage {
//   map: L.Map;
//   marker: L.Marker;
//   circle: L.Circle;
//   constructor() {}

//   ngOnInit() {
//     /*this.map = L.map('map', {
//       center: [17.4, 78.5],
//       zoom: 15,
//       renderer: L.canvas(),
//     });*/

//     //this.map = L.map('map').setView([51.5, -0.09], 13);
//     //this.marker = L.marker([51.5,-0.09]).addTo(this.map);
//     //this.marker = L.marker([51.5, -0.09]).addTo(this.map);
//     //this.marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//     /*this.circle = L.circle([51.508, -0.11], {
//       color: 'red',
//       fillColor: '#f03',
//       fillOpacity: 0.5,
//       radius: 500
//   }).addTo(this.map);*/

//   const map = L.map('map');
//   // Initializes map

//   map.setView([51.505, -0.09], 13);
//   // Sets initial coordinates and zoom level

//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '© OpenStreetMap'
//   }).addTo(map);
//   // Sets map data source and associates with map

//   let marker, circle, zoomed;

//   navigator.geolocation.watchPosition(success, error);

//   function success(pos) {

//       const lat = pos.coords.latitude;
//       const lng = pos.coords.longitude;
//       const accuracy = pos.coords.accuracy;

//       if (marker) {
//           map.removeLayer(marker);
//           map.removeLayer(circle);
//       }
//       // Removes any existing marker and circule (new ones about to be set)

//       marker = L.marker([lat, lng]).addTo(map);
//       circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
//       // Adds marker to the map and a circle for accuracy

//       if (!zoomed) {
//           zoomed = map.fitBounds(circle.getBounds());
//       }
//       // Set zoom to boundaries of accuracy circle

//       map.setView([lat, lng]);
//       // Set map focus to current user position

//   }
//   //L.control.locate().addTo(map);

//   function error(err) {

//       if (err.code === 1) {
//           alert("Please allow geolocation access");
//       } else {
//           alert("Cannot get current location");
//       }

//   }
//   setTimeout(() => {
//     map.invalidateSize();
//   }, 0);
//   }
// }
