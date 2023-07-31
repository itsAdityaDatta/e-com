import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {


  logout() :void {
    this.loginService.logOut();
    this.router.navigate(['/']);
    
  }

  constructor(public loginService : LoginService, public router : Router) { }

  ngOnInit(): void {
  }

}
