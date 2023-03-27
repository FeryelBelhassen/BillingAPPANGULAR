import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/services/product.service';
import { FactureService } from './demo/services/facture.service';
import { UserService } from './demo/services/user.service';
import { EventService } from './demo/services/event.service';
import { IconService } from './demo/services/icon.service';
import { NodeService } from './demo/services/node.service';
import { PhotoService } from './layout/service/photo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import {TreeSelectModule} from 'primeng/treeselect';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './demo/services/auth.service';
import { AuthGuard } from './_helpers/auth.guard';
import { PagesModule } from './demo/components/pages/pages.module';
import { DashboardComponent } from './demo/components/pages/dashboard/dashboard.component';
import { LoginModule } from './demo/components/auth/login/login.module';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { Router, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UserComponent } from './demo/components/user/user.component';
import { UserModule } from './demo/components/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    TreeSelectModule,
    PagesModule,
    UserModule
    
    
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy},
        UserService, FactureService, EventService, IconService, NodeService,
        PhotoService, ProductService,JwtHelperService, AuthService, AuthGuard, 
      
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
