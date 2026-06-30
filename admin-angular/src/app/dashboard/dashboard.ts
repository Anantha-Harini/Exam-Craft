import { Component, inject } from '@angular/core';
import { AuthService } from '../auth-service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authService=inject(AuthService);
  
}
