import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivateFn, Router } from "@angular/router";


export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(!authService.isLogged()) {
        router.navigate(['/login']);
    return false;  
    }

    return true;

};