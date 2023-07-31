import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { FilterService } from './services/filter.service';
import { LoginService } from './services/login.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'BookStore';

  constructor(private cartService : CartService, private loginService : LoginService, public filterService : FilterService){
    if(localStorage.getItem('cart')) cartService.setCart(JSON.parse(localStorage.getItem('cart')!));
    else cartService.setCart(cartService.getEmptyCart());

    if(sessionStorage.getItem('filters')) filterService.setFilters(JSON.parse(sessionStorage.getItem('filters')!));
    else filterService.setFilters(filterService.getEmptyFilters());

    
    if(localStorage.getItem('loggedInUser')) loginService.setLoggedInUser(Number(JSON.parse(localStorage.getItem('loggedInUser')!)));

  }
}
