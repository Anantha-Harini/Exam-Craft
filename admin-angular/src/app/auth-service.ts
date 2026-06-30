import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router=inject(Router);
  
  login(username: string){
    if(typeof window !== 'undefined'){
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    this.router.navigate(['/dashboard']); 
  }
}

  logout(){
    if(typeof window !== 'undefined'){
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}

  isLoggedIn(){
    if(typeof window !== 'undefined'){
    return localStorage.getItem('isLoggedIn') == 'true';
  }
  return true;
  }

  getUsername(){
    if(typeof window !== 'undefined'){
    return localStorage.getItem('username');
  }
  return null;
  }
}
