import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  invalidEmailPswd: boolean = false;

  logout() :void {
    this.loginService.logOut();
    location.reload();
  }

  hideAlert(x : any) : void {
    if(x.key != 'Enter') this.invalidEmailPswd = false;
  }

  onSubmit(val: any) : void{
    let userId = this.loginService.getUserId(val.email, val.pswd);
    if(userId == -1) this.invalidEmailPswd = true;
    else{
      this.loginService.setLoggedInUser(userId);
      this.cartService.numItemsInCart = this.cartService.getNumberOfItemsInCart(this.cartService.getUsersCart(userId));
      this.invalidEmailPswd = false;
      this.router.navigate(['/home']);
    }
  }



  constructor(private router: Router, private loginService : LoginService, public cartService: CartService) { 
    this.isUserLoggedIn = loginService.isUserLoggedIn();
  }

  ngOnInit(): void {
  }


  

}
