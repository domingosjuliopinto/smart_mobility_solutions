import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent,GridComponent} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';


@Component({
  selector: 'app-driverstats',
  templateUrl: 'driverstats.page.html',
  styleUrls: ['driverstats.page.scss'],
})
export class DriverStatsPage implements OnInit{

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
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
      this.renderer.setStyle(chartContainer, 'height', '320px');
      this.renderer.setStyle(chartContainer1, 'width', '310px');
      this.renderer.setStyle(chartContainer1, 'height', '310px');
      this.renderer.setStyle(chartContainer2, 'width', '310px');
      this.renderer.setStyle(chartContainer2, 'height', '310px');
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
            { value: 735, name: 'Fleet Occupied' },
            { value: 1048, name: 'Fleet Free' },
            { value: 580, name: 'Fleet Repairs' },
            { value: 484, name: 'Fleet Accident' },
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
        text: 'Packages Delivered Per Day',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
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
        text: 'Average tasks done monthly',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [25,40, 30, 50, 45, 40],
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