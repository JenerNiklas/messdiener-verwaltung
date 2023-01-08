import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessdienerDetailComponent } from "./messdiener-detail/messdiener-detail.component";
import { MessdienerListeComponent } from './messdiener-liste/messdiener-liste.component';
import { ErrorPageComponent } from "./errorpage/errorpage.component";
import { StartpageComponent } from "./startpage/startpage.component";
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: "uebersicht", canActivate: [AuthGuardService], title: "Übersicht - Messdiener Vilich-Müldorf", component: MessdienerListeComponent },
  { path: "detail/:id", title: "Detail - Messdiener Vilich-Müldorf", component: MessdienerDetailComponent },
  { path: "login", title: "Login - Messdiener Vilich-Müldorf", component: LoginComponent },
  { path: "register", title: "Registrieren - Messdiener Vilich-Müldorf", component: RegisterComponent },
  { path: "", title:"Startseite - Messdiener Vilich-Müldorf", component: StartpageComponent},
  { path: "**", title: "Seite nicht gefunden", component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
