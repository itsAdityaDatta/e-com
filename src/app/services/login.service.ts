import { Injectable } from '@angular/core';
import usersJSON from "../../assets/json/users.json";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  private loggedInUser: number = -1;

  public isUserLoggedIn(): boolean {
    if(this.loggedInUser != -1) return true;
    return false;
  }

  public getLoggedInUser() : number{
    return this.loggedInUser;
  }

  public setLoggedInUser(id: number): void {
     localStorage.setItem('loggedInUser', JSON.stringify(id));
     this.loggedInUser = id;
  }

  public logOut() : void{
    this.loggedInUser = -1;
    localStorage.removeItem('loggedInUser');
  }

  public getUserId(email : string, pswd: string) : number{
    let id = -1
    usersJSON.forEach((user)=>{
      if(user.email == email && user.pass == pswd) id = user.userID;
    });
    return id;
  }

  constructor() { 
    if(localStorage.getItem('loggedInUser')) this.loggedInUser = (JSON.parse(localStorage.getItem('loggedInUser')!));
  }


}
