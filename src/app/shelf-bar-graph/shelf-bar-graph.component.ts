import { Component, OnInit } from '@angular/core';
import { single } from '../data';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { products } from '../productData';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shelf-bar-graph',
  templateUrl: './shelf-bar-graph.component.html',
  styleUrls: ['./shelf-bar-graph.component.css']
})
export class ShelfBarGraphComponent implements OnInit {
  single: any[];
  view: any[] = [700, 400];
  products = products.ResultSet.row;
  brands: any;
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Shelf Level';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Percentage of brand';
  brandForm: FormGroup;
  

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  brandShelf: any[];
  isValueSelected: boolean;

  constructor(public fb: FormBuilder) {
    Object.assign(this, { single });
    this.brandForm = this.fb.group({
      brandName: ['', [Validators.required]]
    })
   }
  
  ngOnInit() {
    this.brands = [];
    this.products.forEach((prod)=>{
      if(this.brands.length > 0){
        if(!this.brands.find((val)=> val === prod.brandName)){
          this.brands.push(prod.brandName)
        }
      } else {
        this.brands.push(prod.brandName)
      }
    })
  }
  changeBrand(e) {
    this.isValueSelected = true;
    this.brandForm.controls.brandName.setValue(e.target.value, {
      onlySelf: true
    })
    const selectedBrand = this.brandForm.controls.brandName.value.split(': ')[1]
    const data = this.products.filter((item)=> item.brandName === selectedBrand)
    let shelfCount = {}
    data.forEach(function(i) { shelfCount[i.shelfLevel] = (shelfCount[i.shelfLevel] || 0) + 1;});
    const sum = (a, b)=> a + b;
    const total = Object.values(shelfCount).reduce(sum)
    this.brandShelf = []
    for (let [key, value] of Object.entries(shelfCount)){
      const result = (Number(value) / Number(total))*100;
      this.brandShelf.push({
        name: key,
        value: result
      }) 
    }
  }
  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
