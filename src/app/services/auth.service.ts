import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false;

  isLoggedIn(): boolean {
    // check local storage to check the user's login status

    if (localStorage.getItem('user')) {
      this.loggedInStatus = true;
    } else { 
      this.loggedInStatus = false;
    } 

    return this.loggedInStatus;
  }

  getAuthUser(): any {
    // get the user's data from local storage
    let user = localStorage.getItem('user');
    return JSON.parse(user? user : '{}');
  }

  setUser(response: any): any {
    // set user and toke in localstorage
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', JSON.stringify(response.data.token));
  }

  changeRole(role_id: string): any {
    // change the user's role
    let user = this.getAuthUser();
    user.current_role_id = role_id;
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAdmin(): boolean { 
    // check if the user is an admin
    let user = this.getAuthUser();
    return user.current_role_id === 1;
  }

  isClient(): boolean { 
    // check if the user is a client  
    let user = this.getAuthUser();
    return user.current_role_id === 2;
  }

  getClientName(): string {
    // get the client's name
    let user = this.getAuthUser();
    return user.client_name;
  }

  getClientCurrency(): string {
    // get the client's name
    let user = this.getAuthUser();
    return user.client_currency;
  }

  getClientId(): number {
    // get the client's id
    let user = this.getAuthUser();
    return user.client_id;
  }

  login(user: any): void {
    // update local storage to set the user's login status to true
    localStorage.setItem('user', user);
    this.loggedInStatus = true;
  }

  logout(): void {
    // update local storage to set the user's login status to false
    localStorage.removeItem('user');
    this.loggedInStatus = false;
  }
}
