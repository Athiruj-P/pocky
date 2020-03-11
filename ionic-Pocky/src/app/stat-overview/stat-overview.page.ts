import { OnInit, ElementRef } from "@angular/core";
import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
@Component({
  selector: 'app-stat-overview',
  templateUrl: './stat-overview.page.html',
  styleUrls: ['./stat-overview.page.scss'],
})
export class StatOverviewPage implements OnInit {

  @ViewChild('lineCanvas', { static: true }) lineCanvas: ElementRef;
  @ViewChild('gaugeArea', { static: true }) gaugeArea: ElementRef;

  lineChart: any;
  gaugeChart: any
  constructor() { }

  ngOnInit() {
    this.lineChartMethod();
    this.guageChartMethod();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['02 Jan', '04 Jan', '06 Jan', '08 Jan', '10 Jan',
          '12 Jan', '14 Jan', '16 Jan', '18 Jan', '20 Jan',
          '22 Jan', '24 Jan', '26 Jan', '28 Jan', '30 Jan'],
        datasets: [
          {
            label: 'Balance',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'green',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(255, 201, 0)',
            pointBackgroundColor: 'green',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [750, 650, 500, 450, 400, 150, 110, 500, 670, 550, 500, 470, 380, 335, 300],
            spanGaps: false,
          },
          {
            label: 'Expense',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: "#ed213a",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#ed213a',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 50, 75, 100, 115, 125, 167, 260, 330, 379, 403, 500, 740, 820, 847],
            spanGaps: false,
          }
        ]

      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  guageChartMethod() {
    this.gaugeChart = new Chart(this.gaugeArea.nativeElement, {
      // The type of chart we want to create
      type: 'doughnut',

      // The data for our dataset
      data: {
        labels: ["Balance", "Expense"],
        datasets: [{
          label: "My First dataset",
          backgroundColor: ['green', 'red'],
          borderColor: '#fff',
          data: [300, 847],
        }]
      },

      // Configuration options go here
      options: {
        circumference: 1 * Math.PI,
        rotation: 1 * Math.PI,
        cutoutPercentage: 90
      }
    });
  }
}
