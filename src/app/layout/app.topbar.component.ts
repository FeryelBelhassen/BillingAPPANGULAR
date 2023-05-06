import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { SlideMenu } from 'primeng/slidemenu';
import { ContextMenu } from 'primeng/contextmenu';
import { User } from '../demo/domain/user';
import { UserService } from '../demo/services/user.service';
import { AuthService } from '../demo/services/auth.service';
import { Router } from '@angular/router';
declare var myScript: any;
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    showMenu = false;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
   
    loggedInUser!: User;
    
    constructor(public layoutService: LayoutService, private authService: AuthService,
        private route: Router) { }
    
    
    
    ngOnInit() {
       /* this.loggedInUser = this.authService.getLoggedInUser();*/
       
       
    }
    toggleMenu(){
        this.showMenu = !this.showMenu;
    }
 

    getUser(){
        var username =this.authService.userValue.username ;
        var password = this.authService.userValue.password;
        var role_name =this.authService.UserRole.roles ;

    }
    logout() {
        console.log('OUuuuttt')
       /* this.authService.logout().subscribe(
          response => {
            if (response.status === 200) {
              this.route.navigate(['/auth/login']);
            }
          },
          error => {
            console.log(error);
          }
        );*/
        this.route.navigate(['/auth/login']);
      }
      

    
}
  

