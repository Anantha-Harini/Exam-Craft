import { Component, inject, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  authService=inject(AuthService);
  router=inject(Router);
  
  protected readonly title = signal('admin-angular');
}
