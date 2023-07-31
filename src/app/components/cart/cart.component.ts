import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { LoginService } from 'src/app/services/login.service';
import { InventoryService } from '../../services/inventory.service';
import { Papa } from 'ngx-papaparse';


interface IProduct{
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  loggedInUserId : number = -1;
  isUserLoggedIn: boolean = false;
  cart! : IProduct[];
  itemArr : any = [];
  selectedItemToBeDeleted : number = -1;
  displayStyle = "none";
  totalPrice : number = 0;
  justPlaced : boolean = false;
  

  hideAlert() : void {
    window.setTimeout(()=>{
        this.justPlaced = false;
    }, 2500);
  }

  hideModal() : void{
    this.displayStyle = 'none';
  }

  showModal() : void{
    this.displayStyle = 'block';
  }

  getTotalPrice(quantity : number, price : number) : number{
    return quantity*price; 
  }

  displayCart() : void{
    this.loggedInUserId = JSON.parse(localStorage.getItem('loggedInUser')!);
    this.cart = this.cartService.getUsersCart(this.loggedInUserId);
    let products = this.inventoryService.getInventory();
    this.itemArr = [];
    this.totalPrice = 0;
    for(let i=0; i<this.cart.length; i++){
      if( !(this.cart[i].id < 0 || this.cart[i].id >= this.inventoryService.getInventory().length || this.cart[i].quantity <= 0) ){
        this.itemArr.push({'product' : products[(this.cart[i].id)], 'quantity' : this.cart[i].quantity});
        this.totalPrice += (products[this.cart[i].id].price)*(this.cart[i].quantity);
      }
    }
  }

  clearCart() : void{
    this.cartService.clearUserCart();
    this.displayCart();
  }

  placeOrder() : void{
    let jsonArr : any = [];
    this.itemArr.forEach((item : any) => {
      jsonArr.push({"ID": item.product.id, "Title": item.product.name, "Author" : item.product.author, "Quantity" : item.quantity, "Rating" : item.product.rating, "Description": String(item.product.desc), "Image Source" : item.product.img, "Publisher" : item.product.publisher, "MRP" : item.product.price});
    });
    let csvArr = this.papa.unparse(jsonArr);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvArr);
    hiddenElement.target = '_blank';
    let today = new Date();
    let date = today.getDate();
    let time = today.getHours() + '_' + today.getMinutes() + '_' + today.getSeconds();
    let dateTime = time + '_' + date;
    let str = "id=" + this.loginService.getLoggedInUser() + "_time=" + dateTime + '.csv';
    hiddenElement.download = str.trim();
    hiddenElement.click();
    this.clearCart();

    this.justPlaced = true;
    this.hideAlert();
  }

  addProduct(id: number) : void {
    this.cartService.addToCart(id);
    this.displayCart();
  }

  deleteProduct(id: number) : void{
    let returnVal = this.cartService.deleteFromCart(id);
    if(returnVal == -1){
      this.selectedItemToBeDeleted = id;
      this.showModal();
    }
    this.displayCart();
  }

  removeProduct() : void{
    this.cartService.removeFromCart(this.selectedItemToBeDeleted);
    this.hideModal();
    this.displayCart();
  }

  trash(itemId : number) : void {
    this.selectedItemToBeDeleted = itemId;
    this.showModal();
  }

  createRange(number : number){
    return new Array(number);
  }

  constructor(public cartService : CartService, public loginService : LoginService, public inventoryService : InventoryService, public papa : Papa) {
    if(localStorage.getItem('loggedInUser')){
      this.isUserLoggedIn = true;
      this.displayCart();  
    }
  }

  ngOnInit(): void {
  }

}
