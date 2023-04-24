import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent,GridComponent} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { Fleet } from '../entities/fleet/fleet.model';
import { FleetService } from '../entities/fleet/fleet.service';

@Component({
  selector: 'app-driverstats',
  templateUrl: 'driverstats.page.html',
  styleUrls: ['driverstats.page.scss'],
})
export class DriverStatsPage implements OnInit{

  fleets: Fleet[];
  i = 0;

  //for Fleet Pie Diagram
  Occupied = 0
  Free = 0
  Accident = 0
  Repairs = 0
  //for No of Vehicle Bar
  None = 0 
  Cycle = 0
  Scooter = 0
  Bike = 0
  Rickshaw = 0
  Car = 0
  Tempo = 0
  Truck = 0

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private fleetService: FleetService,
    private toastCtrl: ToastController,
    ) {
      this.fleets = [];
    }

    ngOnInit(){
      this.loadAll();
    }

    
  
    async loadAll(refresher?) {
      this.fleetService
        .query()
        .pipe(
          filter((res: HttpResponse<Fleet[]>) => res.ok),
          map((res: HttpResponse<Fleet[]>) => res.body)
        )
        .subscribe(
          (response: Fleet[]) => {
            this.fleets = response;
            for(this.i=0;this.i<this.fleets?.length;this.i++){
              //For Fleet Pie Diagram
              if(this.fleets[this.i].vehicle_status=='Free'){
                this.Free+=1
              }
              if(this.fleets[this.i].vehicle_status=='Occupied'){
                this.Occupied+=1
              }
              if(this.fleets[this.i].vehicle_status=='Accident'){
                this.Accident+=1
              }
              if(this.fleets[this.i].vehicle_status=='Repairs'){
                this.Repairs+=1
              }
              // For No of Vehicle Bar
              if(this.fleets[this.i].vehicle_type=='None'){
                this.None+=1
              }
              if(this.fleets[this.i].vehicle_type=='Cycle'){
                this.Cycle+=1
              }
              if(this.fleets[this.i].vehicle_type=='Scooter'){
                this.Scooter+=1
              }
              if(this.fleets[this.i].vehicle_type=='Bike'){
                this.Bike+=1
              }
              if(this.fleets[this.i].vehicle_type=='Rickshaw'){
                this.Rickshaw+=1
              }
              if(this.fleets[this.i].vehicle_type=='Car'){
                this.Car+=1
              }
              if(this.fleets[this.i].vehicle_type=='Tempo'){
                this.Tempo+=1
              }
              if(this.fleets[this.i].vehicle_type=='Truck'){
                this.Truck+=1
              }
            }
            if (typeof refresher !== 'undefined') {
              setTimeout(() => {
                refresher.target.complete();
              }, 750);
            }
          },
          async error => {
            console.error(error);
            const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
            await toast.present();
          }
        );
    }

    async ionViewWillEnter() {
    const chartContainer = this.el.nativeElement.querySelector('#chart-container');
    const chartContainer1 = this.el.nativeElement.querySelector('#chart-container1');
    const chartContainer2 = this.el.nativeElement.querySelector('#chart-container2');
    const chartContainer3 = this.el.nativeElement.querySelector('#chart-container3');
    const mediaQuery1 = window.matchMedia('(max-width:388px)');
    const mediaQuery2 = window.matchMedia('(max-width:480px)');
    const mediaQuery3 = window.matchMedia('(max-width:602px)');
    const mediaQuery4 = window.matchMedia('(max-width:768px)');
    if (mediaQuery1.matches) {
      this.renderer.setStyle(chartContainer, 'width', '310px');
      this.renderer.setStyle(chartContainer, 'height', '350px');
      this.renderer.setStyle(chartContainer1, 'width', '310px');
      this.renderer.setStyle(chartContainer1, 'height', '310px');
      this.renderer.setStyle(chartContainer2, 'width', '310px');
      this.renderer.setStyle(chartContainer2, 'height', '350px');
      this.renderer.setStyle(chartContainer3, 'width', '310px');
      this.renderer.setStyle(chartContainer3, 'height', '310px');
    }else if(mediaQuery2.matches){
      this.renderer.setStyle(chartContainer, 'width', '400px');
      this.renderer.setStyle(chartContainer, 'height', '400px');
      this.renderer.setStyle(chartContainer1, 'width', '400px');
      this.renderer.setStyle(chartContainer1, 'height', '400px');
      this.renderer.setStyle(chartContainer2, 'width', '400px');
      this.renderer.setStyle(chartContainer2, 'height', '400px');
      this.renderer.setStyle(chartContainer3, 'width', '400px');
      this.renderer.setStyle(chartContainer3, 'height', '400px');
    }else if(mediaQuery3.matches){
      this.renderer.setStyle(chartContainer, 'width', '500px');
      this.renderer.setStyle(chartContainer, 'height', '500px');
      this.renderer.setStyle(chartContainer1, 'width', '500px');
      this.renderer.setStyle(chartContainer1, 'height', '500px');
      this.renderer.setStyle(chartContainer2, 'width', '500px');
      this.renderer.setStyle(chartContainer2, 'height', '500px');
      this.renderer.setStyle(chartContainer3, 'width', '500px');
      this.renderer.setStyle(chartContainer3, 'height', '500px');
    }else if(mediaQuery4.matches){
      this.renderer.setStyle(chartContainer, 'width', '600px');
      this.renderer.setStyle(chartContainer, 'height', '600px');
      this.renderer.setStyle(chartContainer1, 'width', '600px');
      this.renderer.setStyle(chartContainer1, 'height', '600px');
      this.renderer.setStyle(chartContainer2, 'width', '600px');
      this.renderer.setStyle(chartContainer2, 'height', '600px');
      this.renderer.setStyle(chartContainer3, 'width', '600px');
      this.renderer.setStyle(chartContainer3, 'height', '600px');
    }else{
      this.renderer.setStyle(chartContainer, 'width', '700px');
      this.renderer.setStyle(chartContainer, 'height', '700px');
      this.renderer.setStyle(chartContainer1, 'width', '700px');
      this.renderer.setStyle(chartContainer1, 'height', '700px');
      this.renderer.setStyle(chartContainer2, 'width', '700px');
      this.renderer.setStyle(chartContainer2, 'height', '700px');
      this.renderer.setStyle(chartContainer3, 'width', '700px');
      this.renderer.setStyle(chartContainer3, 'height', '700px');
    }
    
    // register echarts components
    echarts.use([PieChart, BarChart, LineChart, TitleComponent, TooltipComponent, CanvasRenderer, LegendComponent,GridComponent]);
  
    // create chart instance
    const chart = echarts.init(document.getElementById('chart-container'));
    const chart1 = echarts.init(document.getElementById('chart-container1'));
    const chart2 = echarts.init(document.getElementById('chart-container2'));
    const chart3 = echarts.init(document.getElementById('chart-container3'));
  
    // set chart options
    const options: EChartsOption = {
      title: {
        text: 'Fleet Management',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.Occupied, name: 'Fleet Occupied' },
            { value: this.Free, name: 'Fleet Free' },
            { value: this.Repairs, name: 'Fleet Repairs' },
            { value: this.Accident, name: 'Fleet Accident' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    const options1: EChartsOption = {
      title: {
        text: 'No of Vehicle in Fleet',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['None','Cycle','Scooter','Bike','Rickshaw','Car','Tempo','Truck'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [this.None,this.Cycle,this.Scooter,this.Bike,this.Rickshaw,this.Car,this.Tempo,this.Truck],
          type: 'bar',
        },
      ],
    };

    const options2: EChartsOption = {
      title: {
        text: 'Package Management',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 735, name: 'At Source' },
            { value: 580, name: 'At Destination' },
            { value: 1048, name: 'On the Way' },
          ],
        },
      ],
    };

    const options3: EChartsOption = {
      title: {
        text: 'Packages Delivered Per Day',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line'
        }
      ]
    };
  
    // set chart options and render chart
    chart.setOption(options);
    chart1.setOption(options1);
    chart2.setOption(options2);
    chart3.setOption(options3);
  }
  
}