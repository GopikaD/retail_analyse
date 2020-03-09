import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HigherChartService } from '../higher-chart.service';
import { products } from '../productData';
declare var google: any;
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChart: ElementRef
  productData = [];
  finalCalculation: any[];
  defaultOptions: { chart: { plotBackgroundColor: any; plotBorderWidth: any; plotShadow: boolean; type: string; }; title: { text: string; }; tooltip: { pointFormat: string; }; plotOptions: { pie: { allowPointSelect: boolean; cursor: string; dataLabels: { enabled: boolean; format: string; style: { color: any; }; }; showInLegend: boolean; }; }; series: { name: string; colorByPoint: boolean; data: any[]; }[]; };
  googoleData: any[][];
  constructor(private hcs: HigherChartService) { 
    const data = products.ResultSet.row;
    data.forEach((item)=>{
        if(item.shelfLevel.toLowerCase() === 'top'){
        this.productData.push(item)
        }
    })

    var brandCount = {};
    this.productData.forEach(function(i) { brandCount[i.brandName] = (brandCount[i.brandName] || 0) + 1;});
    const averageCount = []
    Object.values(brandCount).forEach((val)=>{
        const count = (Number(val)/this.productData.length)*100
        averageCount.push(count)
    })
    this.finalCalculation = []
    Object.keys(brandCount).forEach((name, i)=>{
            if(this.finalCalculation.length > 0){
                if(!this.finalCalculation.find((i)=> i.brand === name)) {
                    this.finalCalculation.push({
                      name: name,
                      y: averageCount[i]
                    })
                }
            } else {
                this.finalCalculation.push({
                    name: name,
                    y: averageCount[i]
                })
            }
    })
    this.googoleData = this.finalCalculation.map(function(obj) {
      return Object.keys(obj).sort().map(function(key) { 
        return obj[key];
      });
    });
    this.googoleData.unshift(['brand', 'percentage'])
  }

  drawChart = () =>{
    let data: any
    data =  google.visualization.arrayToDataTable(this.googoleData);
    const options = {
      title: '',
      legend: {position: 'top'}
    };
  
    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);
  
    chart.draw(data, options);
  }
  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

}
