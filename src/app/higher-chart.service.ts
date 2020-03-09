import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { products } from './productData';

@Injectable({
  providedIn: 'root'
})
export class HigherChartService {
    productData = [];
    finalCalculation = []
  charts = [];
  defaultOptions: any;

  constructor() {
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
                        brand: name,
                        percentage: averageCount[i]
                    })
                }
            } else {
                this.finalCalculation.push({
                    name: name,
                    y: averageCount[i]
                })
            }
    })
    this.defaultOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: this.finalCalculation
        }]
    }
  }
  
  createChart(container, options?: Object) {
    let opts = this.defaultOptions;
    let e = document.createElement("div");
    
    container.appendChild(e);
    
    if(opts.chart) {
     // opts.chart['renderTo'] = e;
    }
    Highcharts.chart(container, opts);
  }
}
