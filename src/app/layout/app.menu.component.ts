import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { User } from '../demo/domain/user';
import { UserService } from '../demo/services/user.service';
import { Role } from '../demo/domain/Role';
import { Useer } from '../demo/domain/useer';
import { AuthService } from '../demo/services/auth.service';


        
   
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})

export class AppMenuComponent implements OnInit {
    items = [  { label: 'Item 1' },  { label: 'Item 2' },  { label: 'Item 3' }];
    users:Array<User> = [];
    model: any[] = [];
    modelAdmin :any[] = [];
    modelAgent :any[] = [];
    modelMagasinier :any[] = [];
    modelClient :any[] = [];
    user! :User;
    roles: Role[] = [
        { id: 0, name: 'admin' },
        { id: 1, name: 'user' },
        { id: 2, name: 'agent' },
        { id: 3, name: 'magasinier' },
        { id: 4, name: 'client' },

      ];
      
    rolename = 'admin';
    currentUser!: Useer;
   
    constructor(public layoutService: LayoutService, public userService: UserService,
        private authService: AuthService) { }
  
   
    

    ngOnInit() {
       
        this.getUsers();
        this.modelAdmin = [
           
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
                   
                   /* {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user-plus',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                           
                    },*/
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

            this.modelMagasinier = [
           
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

        this.modelAgent = [
           
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
                        routerLink: ['/client']
                    },
                   

                    
                ]
            },
        ]

        this.modelClient = [
           
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
        if ( this.authService.userValue && this.rolename === 'admin') {
            this.model = this.modelAdmin;
        }
        else if (this.authService.userValue && this.rolename === 'magasinier') {
            this.model = this.modelMagasinier; 
        }
        else if (this.authService.userValue && this.rolename === 'agent') {
            this.model = this.modelAgent;
        }
        else if (this.authService.userValue && this.rolename === 'client') {
            this.model = this.modelClient;
        } else {
            // Default to showing the "home" menu item only
            this.model = [
                {
                    label: 'home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages/home'] }
                    ]
                }
            ];
        }    
    }
   

    private getUsers(){
        this.userService.getAllUsers()
        .subscribe((users)=>{
                this.user=users;  
                console.log("Array -> "+this.user)
            })
            
        } 


}