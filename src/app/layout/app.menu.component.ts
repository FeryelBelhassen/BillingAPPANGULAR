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
    

    
    items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }];
   /* user!: User;
    private currentUser!: BehaviorSubject<User>;
    roles: Role[] = [
        { id: 0, name: 'admin' },
        { id: 1, name: 'user' },
        { id: 2, name: 'agent' },
        { id: 3, name: 'magasinier' },
        { id: 4, name: 'client' },

    ];
    
   

    users: Array<User> = [];
    model: any[]=[];


    constructor(public layoutService: LayoutService, public userService: UserService,
       private authService: AuthService) {}
   


    ngOnInit() {
        this.model = [
           
            {
                label: 'home',
                items: [

                    {
                      label: 'Dashboard',
                      icon: 'pi pi-fw pi-home',
                      routerLink: ['/pages/home'],
                      visible: [this.authService.isAdmin() || this.authService.isAgent()]
                    }
                ]
            },
            
                  
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                   
                  
                    {
                        label: 'Product',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/product'],
                        visible: [this.authService.isAdmin() || this.authService.isMagasinier() || this.authService.isClient()]
                    },
                    
                    
                    {
                        label: 'Facture',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/facture'],
                        visible: [this.authService.isAdmin() || this.authService.isMagasinier()]
                    }
                    ,

                    {
                        label: 'FactureAvoir',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/factureavoir'],
                        visible: [this.authService.isAdmin() || this.authService.isMagasinier()]
                    },

                    {
                        label: 'Devis ',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/devis'],
                        visible: [this.authService.isAdmin() || this.authService.isMagasinier()]
                    },

                    {
                        label: 'Client',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/client'],
                        visible: [this.authService.isAdmin() || this.authService.isAgent()]
                    },
                   

                    
                ]
            },
        ]
    }
}



    */
    
   
   
   
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

                {
                    label: 'Client',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/client']
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

                {
                    label: 'Client',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/client']
                },



            ]
        },
  
    ]

    public models: any[] = [this.modelAdmin, this.modelClient, this.modelAgent, this.modelMagasinier];

    constructor(public layoutService: LayoutService, private authService: AuthService) {}
       

    
    ngOnInit() {
        
        this.models
        console.log('models',this.models)
        console.log('modelAdmin:', this.modelAdmin);
        
        var role_name =this.authService.UserRole.roles 
        console.log('Current user:', this.authService.UserRole.roles);
        console.log(typeof this.authService.UserRole.roles[0]);
        console.log(role_name)

        switch (this.authService.UserRole.roles[0].name) {
            //@ts-ignore
            case 'admin':
              this.models = this.modelAdmin;
              break;
              //@ts-ignore
            case 'agent':
              this.models = this.modelAgent;
              break;
              //@ts-ignore
            case 'magasinier':
              this.models = this.modelMagasinier;
              break;
              //@ts-ignore
            case 'client':
              this.models = this.modelClient;
              break;
            default:
              this.models = [];
              break;
          }
    }
}
