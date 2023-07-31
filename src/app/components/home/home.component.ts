import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  products: any[] = [];
  isUserLoggedIn: boolean = false;
  filterFixString : string = "";
  sortArr : string[] = ["relevance", "rating", "price (low-high)", "price (high-low)"];
  totalProducts : number = 0;

  filters : any = {};

  ratingHandler(rating : number) : void{
    this.filters.minRating = rating;
    this.filterService.setFilters(this.filters); 
    this.products = this.filterService.filterProducts();
  }

  priceHandler(event: any) : void{
    let newPrice = event.target.value;
    this.filters.maxPrice = newPrice;
    this.filterService.setFilters(this.filters);
    this.products = this.filterService.filterProducts();
  }

  sortHandler(num : number) : void{
    this.filters['sort'] =  num; 
    this.filterService.setFilters(this.filters);
    this.products = this.filterService.filterProducts();

  }

  saveFilters() : void{
    this.filterService.setFilters(this.filters);    
    this.products = this.filterService.filterProducts();
  }

  filterFixStringFunction() : void {
    let width = window.innerWidth;
    let x;
    if(width >= 768) x = width/27;
    else x = width/18;
    let str = "";
    for(let i =0; i < x; i++) str += '.';
    this.filterFixString = str;
  }

  constructor(private inventory: InventoryService, private router: Router, private loginService : LoginService, public filterService : FilterService) { 
    this.products = this.filterService.filterProducts();
    this.totalProducts = inventory.getInventory().length;
    this.isUserLoggedIn = loginService.isUserLoggedIn();

    this.filters = filterService.getFilters();
  }

  ngOnInit(): void {
    this.filterFixStringFunction();
  }

}
