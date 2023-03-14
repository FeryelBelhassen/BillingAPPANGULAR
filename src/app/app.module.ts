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

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    TreeSelectModule
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
        UserService, FactureService, EventService, IconService, NodeService,
        PhotoService, ProductService,JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
