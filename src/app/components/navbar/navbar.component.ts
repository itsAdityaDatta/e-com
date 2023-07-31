import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logout() : void{
    this.loginService.logOut();
    this.router.navigate(['/']);

  }

  constructor(public loginService : LoginService, private router: Router, public cartService : CartService) {
  }

  ngOnInit(): void {
    
  }

}
