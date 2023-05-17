import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { User } from '../demo/domain/user';
import { UserService } from '../demo/services/user.service';
import { Role } from '../demo/domain/Role';
import { Useer } from '../demo/domain/useer';
import { AuthService } from '../demo/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';



@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})



export class AppMenuComponent implements OnInit {
    public username: string;

    roles: string;
    
    id: number;
    items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }];
    modelAdmin: any =[

        {
            label: 'home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages/home'] }
            ]
        },

        


        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            items: [

                {
                    label: 'Product',
                    icon: 'pi pi-fw pi-box',
                    routerLink: ['/product']
                },

                {
                    label: 'Facture',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/facture']
                },

                {
                    label: 'FactureAvoir',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/factureavoir']
                },

                {
                    label: 'Devis ',
                    icon: 'pi pi-fw pi-dollar',
                    routerLink: ['/devis']
                },

                {
                    label: 'Client',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/client']
                },



            ]
        },
        
  
    ]

    modelMagasinier = [

        {
            label: 'home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages/home'] }
            ]
        },


        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            items: [

                {
                    label: 'Product',
                    icon: 'pi pi-fw pi-box',
                    routerLink: ['/product']
                },

                {
                    label: 'Facture',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/facture']
                },

                {
                    label: 'FactureAvoir',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/factureavoir']
                },

                {
                    label: 'Devis ',
                    icon: 'pi pi-fw pi-dollar',
                    routerLink: ['/devis']
                },

            


            ]
        },
       

    ]

    modelAgent = [

        {
            label: 'home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages/home'] }
            ]
        },


        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            items: [


                {
                    label: 'Client',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/client'],
                    
                },



            ]
        },
      
    ]

    modelClient = [

        {
            label: 'home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages/home'] }
                
            ]
           
        },


        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            items: [

                {
                    label: 'Product',
                    icon: 'pi pi-fw pi-box',
                    routerLink: ['/product']
                },

                {
                    label: 'Facture',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/facture']
                },

                {
                    label: 'FactureAvoir',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/factureavoir']
                },

                {
                    label: 'Devis ',
                    icon: 'pi pi-fw pi-dollar',
                    routerLink: ['/devis']
                },

             



            ]
        },
  
    ]

    public models: any[] = [this.modelAdmin, this.modelClient, this.modelAgent, this.modelMagasinier];

    constructor(public layoutService: LayoutService, private authService: AuthService,
        private userService: UserService) {
        this.username = authService.getUsername();
        console.log(this.username)
        this.id =this.authService.getAuthedUserID();
        this.roles= this.authService.UserRole.roles[0].name;
    }
       

    
    ngOnInit() {
        this.userService.getUserById(this.id)
        .subscribe((data) => {
          if (data.roles[0].name === 'ADMIN') {
            // Admin user can access all models
            this.models = this.modelAdmin;
          } 

          else if (data.roles[0].name === 'AGENT') {
            // Admin user can access all models
            this.models = this.modelAgent;
          } 
          else if (data.roles[0].name === 'MAGASINIER') {
            // Admin user can access all models
            this.models = this.modelMagasinier;
          } 
          else if (data.roles[0].name === 'CLIENT') {
            // Admin user can access all models
            this.models = this.modelClient;
          } 
        });
      
        
}
}
    
   
   

   

