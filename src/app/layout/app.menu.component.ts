import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
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
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/feryelbelhassen'], target: '_blank'
                    }
                ]
            }
        ];
    }
}
