import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const LoginGuard = () => {
    const log = inject(AuthService);
    const router = inject(Router);

    if(log.estalogueado()){
        return true;
    }
    else{
        router.navigate(['/login']);
        return false;
    }
}