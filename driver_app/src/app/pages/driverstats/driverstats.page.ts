import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent,GridComponent} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { Parcel } from '../entities/parcel/parcel.model';
import { ParcelService } from '../entities/parcel/parcel.service';
import { Account } from 'src/model/account.model';
import { AccountService } from '../../services/auth/account.service';
import { Delivery } from '../entities/delivery/delivery.model';
import { DeliveryService } from '../entities/delivery/delivery.service';
import { Fleet } from '../entities/fleet/fleet.model';
import { FleetService } from '../entities/fleet/fleet.service';

@Component({
  selector: 'app-driverstats',
  templateUrl: 'driverstats.page.html',
  styleUrls: ['driverstats.page.scss'],
})
export class DriverStatsPage implements OnInit{

  account: Account;
  i = 0;
  j = 0;
  drive_id = 0;
  pararr = [];

  //for completion pie
  Ongoing = 0
  Ontime = 0
  Late = 0

  //no of stars
  star0 = 0
  star1 = 0
  star2 = 0
  star3 = 0
  star4 = 0
  star5 = 0

  //no of types of parcel
  documents = 0
  electronics = 0
  light = 0
  heavy = 0

  //kg of parcel
  r0010 = 0
  r1020 = 0
  r2030 =0
  r3040 = 0
  r4050 = 0
  r50 = 0

  constructor(
    private navController: NavController,
    private el: ElementRef, 
    private renderer: Renderer2,
    private fleetService: FleetService,
    private parcelService: ParcelService,
    private deliveryService: DeliveryService,
    private toastCtrl: ToastController,
    private accountService: AccountService,
    ) {}

    ngOnInit(){
      this.accountService.identity().then(account => {
        if (account === null) {
          this.goBackToHomePage();
        } else {
          this.account = account;
          this.loadAll();
        }
      });
    }

    private goBackToHomePage(): void {
      this.navController.navigateBack('');
    }
  
    loadAll(refresher?) {
      this.fleetService
        .query()
        .pipe(
          filter((res: HttpResponse<Fleet[]>) => res.ok),
          map((res: HttpResponse<Fleet[]>) => res.body)
        )
        .subscribe(
          (response: Fleet[]) => {
            for(this.i=0;this.i<response?.length;this.i++){
              if(response[this.i].driver_email==this.account.email){
                this.drive_id = response[this.i].id;
                this.loadAll2();
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

    loadAll1(refresher?) {
      this.parcelService
        .query()
        .pipe(
          filter((res: HttpResponse<Parcel[]>) => res.ok),
          map((res: HttpResponse<Parcel[]>) => res.body)
        )
        .subscribe(
          (response: Parcel[]) => {
            for(this.i=0;this.i<response?.length;this.i++){
              if(this.pararr.includes(response[this.i].id)){
                //for types of parcels delivery
                if(response[this.i].parcel_type=="Electronic Items"){
                  this.electronics+=1
                }
                if(response[this.i].parcel_type=="Documents"){
                  this.documents+=1
                }
                if(response[this.i].parcel_type=="Light Items"){
                  this.light+=1
                }
                if(response[this.i].parcel_type=="Heavy Items"){
                  this.heavy+=1
                }
                //for weight of parcel delivered
                if(response[this.i].parcel_weight_in_kg>=0&&response[this.i].parcel_weight_in_kg<=1.0){
                  this.r0010+=1
                }
                if(response[this.i].parcel_weight_in_kg>1.0&&response[this.i].parcel_weight_in_kg<=2.0){
                  this.r1020+=1
                }
                if(response[this.i].parcel_weight_in_kg>2.0&&response[this.i].parcel_weight_in_kg<=3.0){
                  this.r2030+=1
                }
                if(response[this.i].parcel_weight_in_kg>3.0&&response[this.i].parcel_weight_in_kg<=4.0){
                  this.r3040+=1
                }
                if(response[this.i].parcel_weight_in_kg>=4.0&&response[this.i].parcel_weight_in_kg<=5.0){
                  this.r4050+=1
                }
                if(response[this.i].parcel_weight_in_kg>=5.0){
                  this.r50+=1
                }
              }
            }
            this.graphs();
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

    loadAll2(refresher?) {
      this.deliveryService
        .query()
        .pipe(
          filter((res: HttpResponse<Delivery[]>) => res.ok),
          map((res: HttpResponse<Delivery[]>) => res.body)
        )
        .subscribe(
          (response: Delivery[]) => {
            for(this.j=0;this.j<response?.length;this.j++){
              if(response[this.j].driver_id==this.drive_id){
                if(response[this.j].star_received==0){
                  this.star0+=1
                }
                if(response[this.j].star_received==1){
                  this.star1+=1
                }
                if(response[this.j].star_received==2){
                  this.star2+=1
                }
                if(response[this.j].star_received==3){
                  this.star3+=1
                }
                if(response[this.j].star_received==4){
                  this.star4+=1
                }
                if(response[this.j].star_received==5){
                  this.star5+=1
                }
                var duration = this.tol(response[this.j].assigned_time,response[this.j].estimated_time,response[this.j].ended_time)
                if(duration){
                  if (duration>=0){
                    this.Ontime+=1;
                  }else{
                    this.Late+=1;
                  }
                }else{
                  this.Ongoing+=1;
                }
                this.pararr.push(response[this.j].parcel_id)
              }
            }
            this.loadAll1();
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

    tol(assigned_time,estimated_time,ended_time){
      if(assigned_time&&estimated_time&&ended_time){
        const startDate = new Date(assigned_time).getTime();
        const estiDate = new Date(estimated_time).getTime();
        const endDate = new Date(ended_time).getTime();

        const duration = (estiDate-startDate)-(endDate-startDate);
        return duration
      }else{
        return null
      }
    }

    graphs() {
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
        text: 'Parcel Delivery Status',
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
            { value: this.Ongoing, name: 'Ongoing' },
            { value: this.Ontime, name: 'Ontime' },
            { value: this.Late, name: 'Late' },
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
        text: 'Total Stars Received',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['0', '1', '2', '3', '4', '5'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [this.star0,this.star1,this.star2,this.star3,this.star4,this.star5],
          type: 'line',
        },
      ],
    };

    const options2: EChartsOption = {
      title: {
        text: 'Types of Parcel Delivery',
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
            { value: this.electronics, name: 'Electronic Items' },
            { value: this.documents, name: 'Documents' },
            { value: this.light, name: 'Light Items' },
            { value: this.heavy, name: 'Heavy Items' },
          ],
        },
      ],
    };

    const options3: EChartsOption = {
      title: {
        text: 'Weight of Parcel Delivery',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['0-1.0', '1.0-2,0', '2.0-3.0', '3.0-4.0', '4.0-5.0', '5.0+'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [this.r0010,this.r1020,this.r2030,this.r3040,this.r4050,this.r50],
          type: 'bar'
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