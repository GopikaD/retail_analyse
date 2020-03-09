import { Component, OnInit, ViewChild, EventEmitter, Output, Input, Directive, ViewChildren, QueryList } from '@angular/core';
import { products } from 'src/app/productData';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
export interface SortEvent {
  column: string;
  direction: SortDirection;
}
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {
  displayedColumns = [ 'UPC', 'Product Short Name', 'Brand Name', 'Shelf Level'];
  searchString: string;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  
  dataSource: { 
    "upc": string; 
    "upcConfidence": string; 
    "x": string; 
    "y": string; 
    "width": string; 
    "height": string; 
    "productShortName": string; 
    "productLongName": string; 
    "brandName": string; 
    "shelfLevel": string; 
    "id": string; }[];
  constructor() { 
  }
 
  ngOnInit() {
    const users = products.ResultSet.row;
    this.dataSource = users;
    this.collectionSize = this.dataSource.length;
  }
  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.dataSource = products.ResultSet.row;
    } else {
      this.dataSource = [...this.dataSource].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

}
