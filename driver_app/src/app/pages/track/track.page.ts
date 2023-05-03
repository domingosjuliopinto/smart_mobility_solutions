import { Component, OnInit } from '@angular/core';
import * as L from "leaflet";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
} from '@ionic-native/background-geolocation/ngx';
// const io = require('socket.io-client')
let payload;
var bus = L.icon({
  iconUrl: '../../../assets/icon/bus1.png',
  iconSize: [20, 40],

})
function getPosition(position) {
  
  console.log(position)
  let lat = position.coords.latitude
  console.log(lat);
  let long = position.coords.longitude
  console.log(long);              
  let accuracy = position.coords.accuracy
 let value = [lat,long]
  let payload = [
    {
      topic: 'location',
      messages: value,
    }
  ]
  console.log(payload);
       
};
@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  map: L.Map;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  bus = L.marker([this.latitude, this.longitude], {icon: bus});
  constructor(private geolocation: Geolocation,protected http: HttpClient) { }
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log('location='+this.latitude+","+this.longitude)
      // L.marker([this.latitude, this.longitude], {icon: bus}).addTo(this.map).bindPopup('location='+this.latitude+","+this.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    }

    ngOnInit() {
this.sendlocation()
this.loadmap();
// this.webSocketInvoke()

  }

  loadmap (){
          // this.sendlocation();
          this.map = L.map('map', {
            center: [ 19.23496,72.85976],
            zoom: 10,
            renderer: L.canvas()
          })
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© Exelytic',
      }).addTo(this.map)
      this.bus.addTo(this.map).bindPopup('bus 1')
  
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
  /*async ionViewWillEnter() {
    
  }*/

  
  private sendlocation(): void {
 
      setInterval(()=>{
        
        this.geolocation.getCurrentPosition().then((resp)=>{
          this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.bus.setLatLng([this.latitude, this.longitude]);
      // L.marker([this.latitude, this.longitude], {icon: bus}).addTo(this.map).bindPopup('location='+this.latitude+","+this.longitude);
      this.sendPostRequest();
          console.log([resp.coords.latitude,resp.coords.longitude])
        })
      },1000);
     
  };
  sendPostRequest() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.kafka.json.v2+json',
        'Accept': 'application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json'
        })
      };
      var post_data= {
        "records": [
          {
            "key": "location",
            "value": {location:[this.latitude,this.longitude]}
          }
        ]
      }
    this.http.post("http://localhost:8082/topics/location",post_data,httpOptions) 
      .subscribe(data => {
        console.log(data);        
       }, error => {
        console.log(error);
      });
  }

}
