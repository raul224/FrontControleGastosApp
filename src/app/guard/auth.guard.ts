import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AutenticationService} from "../services/autentication/autentication.service";

export const AuthGuard = () => {
  const autenticationService = inject(AutenticationService)
  const router = inject(Router)

  if(autenticationService.isUserAutenticated() !== ""){
    router.navigate([""])
    return true;
  }
  router.navigate(["login"])
  return false;

}
