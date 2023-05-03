import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { User } from '../demo/domain/user';
import { UserService } from '../demo/services/user.service';


        
   
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})

export class AppMenuComponent implements OnInit {
    items = [  { label: 'Item 1' },  { label: 'Item 2' },  { label: 'Item 3' }];
    users:Array<User> = [];
    model: any[] = [];
    user! :User;
   
    constructor(public layoutService: LayoutService, public userService: UserService) { }
  
   
    

    ngOnInit() {
       
        this.getUsers();
        this.model = [
            {
               // label: 'profile',
               /* items: [
                   
                    {   routerLink: ['/profile'] }
                ]*/
            },
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
                           
                            {
                                label: 'Register',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/register']
                            },

                            {
                                label: 'Profile',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/auth/profile']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
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
          /*  {
                label: 'Hierarchy',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                ]
                            },
                        ]
                    }
                ]
            },*/
          
        ];
        
    }

    private getUsers(){
        this.userService.getAllUsers()
        .subscribe((users)=>{
                this.user=users;  
                console.log("Array -> "+this.user)
            })
            
        } 


}