import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { map } from "rxjs/operators";
import { UserService } from "./core/services/user.service";

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./core/auth/auth.component").then((m) => m.AuthComponent),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
