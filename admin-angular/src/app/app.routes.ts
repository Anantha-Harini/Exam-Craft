import { CanActivateFn, Router, Routes } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';
import { Login } from './login/login';
import { Subjects } from './subjects/subjects';
import { Units } from './units/units';
import { Generatepaper } from './generatepaper/generatepaper';
import { Viewpapers } from './viewpapers/viewpapers';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
const authGuard:CanActivateFn = () => {
   const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isLoggedIn()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false; 
    }
};
export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'dashboard',
        component:Dashboard,
        canActivate:[authGuard]
    },
    {
        path:'subjects',
        component:Subjects,
        canActivate:[authGuard]
    },
    {
        path:'units',
        component:Units,
        canActivate:[authGuard]
    },
    {
        path:'generate-paper',
        component:Generatepaper,
        canActivate:[authGuard]
    },
    {
        path:'view-papers',
        component:Viewpapers,
        canActivate:[authGuard]
    }

];
