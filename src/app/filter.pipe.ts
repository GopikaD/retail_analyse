import { products } from './productData';
import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    console.log(items)
    return items.filter((singleItem, i) =>
      singleItem[i].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}