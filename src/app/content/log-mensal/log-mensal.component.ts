import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-log-mensal',
  templateUrl: './log-mensal.component.html',
  styleUrls: ['./log-mensal.component.css']
})
export class LogMensalComponent {
  monthlyValues: {[key: string]: number} = {
    '01/2023': 1000,
    '02/2023': 2000,
    '03/2023': 1500,
    '04/2023': 1800,
    '05/2023': 1600,
  };

  // Gráfico
  chartData: ChartDataset[] = [
    { 
      data: Object.values(this.monthlyValues),
      label: 'Valores mensais',
      backgroundColor: 'green', // Set the bar color to green
      borderColor: 'green', // Set the line color to green
      fill: false // Ensure the line is not filled
    }
  ];
  chartLabels: NgChartsModule[] = Object.keys(this.monthlyValues);
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'green', // Set the font color to green
        },
      },
      x: {
        ticks: {
          color: 'green', // Set the font color to green
        },
      },
    },
  };
  chartLegend = true;
  chartType = 'line';
}
