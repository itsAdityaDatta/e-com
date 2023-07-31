import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  products : any[];
  product : any;
  justAdded: boolean = false;
  itemIdOutOfBound = false;

  createRange(number : number){
    return new Array(number);
  }
  
  hideAlert() : void {
    window.setTimeout(()=>{
        this.justAdded = false;
    }, 1500);
  }

  addToCart():void{
    this.cartService.addToCart(this.product.id);
    this.justAdded = true;
    this.hideAlert();
  }

  constructor(private inventory : InventoryService, private route: ActivatedRoute, public cartService : CartService, public loginService : LoginService) {
    this.products = inventory.getInventory();
   }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    if( isNaN(productIdFromRoute) || productIdFromRoute >= this.inventory.getInventory().length ||  productIdFromRoute < 0) this.itemIdOutOfBound = true;

    this.product = this.products.find(product => product.id === productIdFromRoute);
  }

}
