import { Injectable } from '@angular/core';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root'
})


export class FilterService {
  private filters! : { [key: string] : any };

  public getFilters() : { [key: string] : any }{
    return this.filters;
  }

  public getEmptyFilters() : { [key: string] : any }{
    let emptyFilters : { [key: string] : any } = {
      categories : {
        "Fiction" : true, 
        "Comics" : true, 
        "Economics" : true, 
        "Literature" : true, 
        "SelfHelp" : true, 
        "Academics" : true
      },
      language : {"English" : true, "Hindi" : true},
      minRating : 1,
      maxPrice : 5000,
      sort : 0
    }
    return emptyFilters;
  }

  satisfiesFilters(element : any) : boolean{
    let flag = false;
    let genre = element.genre;
    let language = element.language;
    if( this.filters['categories'][genre] && this.filters['language'][language] && this.filters['maxPrice'] >= element.price && this.filters['minRating'] <= element.rating) flag =  true;
    return flag;
  }

  public filterProducts() : any{
    let products : any[] = [];
    let inv = this.inventoryService.getInventory();
    inv.forEach((element : any) => {
      if(this.satisfiesFilters(element)) products.push(element);
    });

    if(this.filters['sort'] == 0) products.sort((a,b)=>{
      if(a.id > b.id) return 1;
      return -1;
    });
    else if(this.filters['sort'] == 1) products.sort((a,b)=>{
      if(a.rating < b.rating) return 1;
      return -1;
    });
    else if(this.filters['sort'] == 2) products.sort((a,b)=>{
      if(a.price > b.price) return 1;
      return -1;
    });
    else if(this.filters['sort'] == 3) products.sort((a,b)=>{
      if(a.price < b.price) return 1;
      return -1;
    });
    
    return products;
  }

  public setFilters(tempFilters : { [key: string] : any }) : void{
    this.filters = tempFilters;
    sessionStorage.setItem('filters', JSON.stringify(tempFilters));
  }



  constructor( public inventoryService : InventoryService) { }
}
