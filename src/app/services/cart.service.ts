import { LiteralArray } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { InventoryService } from '../services/inventory.service';


interface IProduct{
  id: number;
  quantity: number;
}

interface ICart{
  userId : number;
  items: IProduct[];
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart! : ICart[]; 
  public numItemsInCart : number = 0;

  public getCart(): ICart[]{
    return this.cart;
  }

  public getUsersCart(id: number) : IProduct[]{
    let tempCart = this.getEmptyItemArray();
    this.cart.forEach((el) => {
      if(el.userId == id) tempCart = el.items;
    });
    return tempCart;
  }

  public setCart(tempCart : ICart[]) : void{
    this.cart = tempCart;
    localStorage.setItem('cart', JSON.stringify(tempCart));
  }

  public getNumberOfItemsInCart(cart : IProduct[]) : number{
    let num = 0;
    cart.forEach((el)=>{
      num += el.quantity;
    })
    return num;
  }

  public getEmptyItemArray() : IProduct[]{
    return [];
  }

  public getEmptyCart() : ICart[]{
    return [];
  }

  public addToCart(itemId : number) : void{
    let userID = this.loginService.getLoggedInUser();
    let userFoundFlag = false;
    this.cart.forEach((el) => {
      if(el.userId == userID){
        let itemFoundFlag = false;
        el.items.forEach((item)=>{
          if(item.id == itemId){
            item.quantity += 1;
            itemFoundFlag = true;
          }
        });
        if(!itemFoundFlag){
          el.items.push({id: itemId, quantity: 1});
        }
        userFoundFlag = true;
      }
    });
    if(!userFoundFlag){
      this.cart.push({userId: userID, items:[{id: itemId, quantity: 1}]});
    }
    this.numItemsInCart += 1;
    this.setCart(this.cart);
  }

  public deleteFromCart(itemId : number) : number{
    let userID = this.loginService.getLoggedInUser();
    let flag = 0;
    this.cart.forEach((el) => {
      if(el.userId == userID){
        el.items.forEach((item)=>{
          if(item.id == itemId){
            if(item.quantity == 1){
              flag = -1;
            }
            else{
              this.numItemsInCart -= 1;
              item.quantity -= 1;
              this.setCart(this.cart);
            }
          }
        });
      }
    });
    return flag;
  }

  public removeFromCart(itemId : number) : void{
    let userID = this.loginService.getLoggedInUser();
    this.cart.forEach((el) => {
      if(el.userId == userID){
        el.items.forEach((item)=>{
          if(item.id == itemId){
            el.items = el.items.filter(function(currItem) {
              return currItem.id !== item.id;
            });
            this.numItemsInCart -= item.quantity;
            this.setCart(this.cart);
          }
        });
      }
    });
  }


  public clearUserCart() : void{
    let userID = this.loginService.getLoggedInUser();
    let newCart : ICart[] = [];
    this.cart.forEach((el) => {
      if(el.userId != userID){
        newCart.push(el)
      }
    });
    this.numItemsInCart = 0;
    this.setCart(newCart);
  }

  constructor(public loginService : LoginService, public inventoryService : InventoryService) {
    this.cart = [];
    if(localStorage.getItem('cart')) this.cart = JSON.parse(localStorage.getItem('cart')!);
    this.numItemsInCart = this.getNumberOfItemsInCart(this.getUsersCart(loginService.getLoggedInUser()));
   }
}
