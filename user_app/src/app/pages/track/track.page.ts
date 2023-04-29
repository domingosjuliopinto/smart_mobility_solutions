import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from "leaflet";
import { IonModal , NavController,IonItemSliding, ToastController} from '@ionic/angular';
// import { Trip } from './trip.model';
// import { TripService } from './trip.service';

import { filter, map } from 'rxjs/operators';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Account } from 'src/model/account.model';
import { AccountService } from '../../services/auth/account.service';
import {Buffer} from 'buffer'

// import { Geolocation } from '@ionic-native/geolocation/ngx';


//const io = require('socket.io-client')
// let drivername;

// let location: [17.54714908055362, 78.49258299593477];
var busicon = L.icon({
  iconUrl: '../../../assets/icon/bus1.png',
  iconSize: [30, 40],
  
})
var redbus = L.icon({
    iconUrl: '../../../assets/icon/bus3.png',
  iconSize: [20, 20],
    
   })
@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {

  type2='segment4'
  account: Account;
  @ViewChild(IonModal) modal8: IonModal;

  map: any;
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  bus = L.marker([this.latitude, this.longitude], {icon: busicon});
  // private geolocation: Geolocation
  constructor( private toastCtrl: ToastController,
    private navController: NavController,protected httpClient: HttpClient,private accountService: AccountService,) 
    {  }
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  // use geolocation to get user's device coordinates
  // getCurrentCoordinates() {
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.latitude = resp.coords.latitude;
  //     this.longitude = resp.coords.longitude;
  //     L.marker([this.latitude, this.longitude], {icon: bus}).addTo(this.map).bindPopup('bus 1');
  //     // L.marker([this.latitude, this.longitude], {icon: redbus}).addTo(this.map).bindPopup('bus 2');
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
  //   }

  ngOnInit() { 
    // this.sendlocation()
    // this.webSocketInvoke();
    this.accountService.identity().then(account => {
      
        this.account = account;
      }
    );

  }

  loadMap (){
    this.map = L.map('map', {
      center: [ 19.23496,72.85976],
      zoom: 10,
      renderer: L.canvas()
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© Exelytic',
}).addTo(this.map);
this.bus.addTo(this.map)
// .bindPopup('bus 1')
//  var singlemarker= L.marker([17.461124415222738, 78.38432619785026]);
//  L.icon({iconUrl: 'bus-schedule.png'})
//  singlemarker.addTo(this.map);
//  var popup = singlemarker.bindPopup('Zeptogreens');
//  popup.addTo(this.map);
//  var myIcon = L.icon({
//   iconUrl: '../../../assets/icon/yellowbus.png',
//   iconSize: [20, 40],

//   // iconAnchor: [22, 94],
//   // popupAnchor: [-3, -76],
  
// });

//  var bus = L.icon({
//   iconUrl: '../../../assets/icon/bus1.png',
//   iconSize: [20, 20],
 
//  })
// var redbus = L.icon({
//   iconUrl: '../../../assets/icon/bus3.png',
//   iconSize: [20, 20],
  
// })

//  L.marker(location, {icon: bus}).addTo(this.map).bindPopup('Bus 1');
//  L.marker([17.441918465826863, 78.38758337264912], {icon: bus}).addTo(this.map).bindPopup('Bus 2');
//  L.marker([17.395028303146294, 78.40027178694227], {icon: bus}).addTo(this.map).bindPopup('Bus 3');
//  L.marker([17.455305000126017, 78.43039151386199], {icon: school}).addTo(this.map).bindPopup('School');
//  L.marker([17.395075261147205, 78.46600352720665], {icon: bus}).addTo(this.map).bindPopup('Bus 4');
//  L.marker([17.496488675937638, 78.36948756010733], {icon: redbus}).addTo(this.map).bindPopup('Bus 5');
//  L.marker([17.436599608232797, 78.36252415856094], {icon: bus}).addTo(this.map).bindPopup('Bus 6');
//  L.marker([17.442681295776, 78.49559527037157], {icon: redbus}).addTo(this.map).bindPopup('Bus 7');
//  L.marker([17.512471929652627, 78.34083488777152], {icon:redbus}).addTo(this.map).bindPopup('Bus 8');
//  L.marker([17.502941246659972, 78.47838687820774], {icon:bus}).addTo(this.map).bindPopup('Bus 9');
//  L.marker([17.46694278411355, 78.44615072745269], {icon:bus}).addTo(this.map).bindPopup('Bus 10');
 
 
 
 
 
 
 
//  var myIcon = L.icon({
//   iconUrl: 'bus-schedule.png'
//  })


setTimeout(() => {
  this.map.invalidateSize();
}, 0);
  }
  async ionViewWillEnter() {
    await this.loadAll();
    this.loadMap();
  }
  async loadAll(refresher?) {
    let topic= 'location'
                  let drivername= 'drivername'
                  this.subscribe_topic(topic,drivername)
      
  }

  send_consumer_request (tname,dname) {
    console.log('send consumer instance request')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.kafka.json.v2+json',
        'Accept': 'application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json'
        })
      };
      var post_data= {"name": dname, "format": "binary", "auto.offset.reset": "latest"}

    this.httpClient.post("http://localhost:8082/consumers/"+dname+"",post_data, httpOptions)
      .subscribe(data => {
        console.log(data);
        this.subscribe_topic(tname,dname)
      }, error => {
        console.log(error);
      });

  }

  subscribe_topic(tname,dname) {
    setInterval(() => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.kafka.json.v2+json',
        'Accept': 'application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json'
        })
      };
      var post_data= {"topics":[tname]};  
    this.httpClient.post("http://localhost:8082/consumers/"+dname+"/instances/"+dname+"/subscription",post_data, httpOptions)
      .subscribe(data => {
        console.log('topic subscribed')
        console.log(data);
        this.get_data_records(dname);
      }, error => {
        this.send_consumer_request(tname,dname)
        console.log(error);
      });
    }, 10000);
  }

  get_data_records(dname) {
    // setInterval(() => {
    let n=dname
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.kafka.binary.v2+json'
        })
      };
    this.httpClient.get("http://localhost:8082/consumers/"+dname+"/instances/"+dname+"/records", httpOptions)
      .subscribe(data => {
        console.log(data);
        // this.delete_Instance()
        if (data[0] != null) {
          
        console.log(data[0].value);
        const encoded = data[0].value
        const decoded: string = Buffer.from(encoded, 'base64').toString('utf8');
        console.log(decoded)
        var a = JSON.parse(decoded);
      this.latitude= a.location[0];
      this.longitude= a.location[1];
      // let dname
      // this.map.removeLayer(dname)
      

      dname = L.marker([this.latitude, this.longitude], {icon: busicon}).addTo(this.map).bindPopup(n);
      // this.remove(dname);
      }
        // const encoded = data[0].value
        // const decoded: string = Buffer.from(encoded, 'base64').toString('utf8');
        // console.log(decoded)
      }, error => {
        // this.loadAll();

        console.log('get recoeds error')
        console.log(error);
      });
    // }, 5000);
  }



  remove(n) {
    this.map.removeLayer(n)
  }

 
  cancel() {
    this.modal8.dismiss(null, 'cancel');
  }
  

  confirm() {
    this.modal8.dismiss(null, 'confirm');
  }

  async new() {
    await this.navController.navigateForward('/tabs/entities/trip/new');
  }



  

  
  segmentChanged(ev: any) {
    if (ev._value = "segment5") {
     
        
        this.map.remove();
        this.loadMap()
      
    }
    
}

}
