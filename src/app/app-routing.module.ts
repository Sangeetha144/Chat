import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

import { ProfileComponent } from './components/profile/profile.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
const routes: Routes = [
  {
    "path":"register",
    "component":RegisterComponent
  },
  {
    "path":"login",
    "component":LoginComponent
  },
  {
    "path":"logout",
    "component":LogoutComponent
  },
  
  {
    "path":"profile",
    "component":ProfileComponent,
    canActivate:[AuthGuard]

  },
  {
    "path":"newContact",
    "component":NewContactComponent,
    canActivate:[AuthGuard]

  },
  {
    "path":"home",
    "component":HomeComponent,
    canActivate:[AuthGuard]

  },
  
    { path: 'chat/:id', "component": ChatComponent, outlet: 'chat',canActivate:[AuthGuard] },
     
     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
