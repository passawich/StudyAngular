import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service'
import { HttpModule } from '@angular/http';
import { RouterModule,Routes} from '@angular/router';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                 //api
import {TableModule} from 'primeng/table';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthenticationService as AuthGuard } from './auth/authentication.service';
import { ProfileComponent } from './components/profile/profile.component'
import { RoleGuardService as RoleGuard } from './auth/role-guard.service';
import { CarouselModule } from 'primeng/carousel';
import {PaginatorModule} from 'primeng/paginator';
import { ShopComponent } from './components/shop/shop.component';

const appRoutes:Routes= [
  { path:"Login",component:LoginComponent},
  { path:"Home",component:HomeComponent},
  { path:"Register",component:RegisterComponent},
  { 
    path: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  { path:"Shop",component:ShopComponent},
  // { 
  //   path: 'admin', 
  //   component: AdminComponent, 
  //   canActivate: [RoleGuard], 
  //   data: { 
  //     expectedRole: 'admin'
  //   } 
  // },
  { path: '**', redirectTo: '/Login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarouselModule,
    PaginatorModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
