import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { SlideMenu } from 'primeng/slidemenu';
import { ContextMenu } from 'primeng/contextmenu';
import { User } from '../demo/domain/user';
import { UserService } from '../demo/services/user.service';
import { AuthService } from '../demo/services/auth.service';
import { Router } from '@angular/router';
import { Useer } from '../demo/domain/useer';
import { HttpClient } from '@angular/common/http';
import { Role } from '../demo/domain/Role';
import { DialogModule } from 'primeng/dialog';
declare var myScript: any;
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css'],
})
export class AppTopBarComponent {
   

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
   
    loggedInUser!: User;

    username! : string;

    password!: string;

    email!: string;
 

    idToget:number=NaN;
    idUpdate:number=NaN;

    id!: number;

   
    showedit= false;

    show =false;

    roles: Role[] = [
      { id: 0, name: 'admin' },
      { id: 1, name: 'user' },
      { id: 2, name: 'agent' },
      { id: 3, name: 'magasinier' },
      { id: 4, name: 'client' },

  ];

    editFormOpen = false;
    users:Array<User> = [];
    showMenu = false;
    //showDialog = false;
     user: any;
   
    

    currentUser!: User | null;

   
      
    constructor(public layoutService: LayoutService, private authService: AuthService,
        private route: Router, private userService: UserService, private http: HttpClient,
        ) { 
          this.username = this.authService.getUsername();
          console.log(this.username)
          var role_name =this.authService.UserRole.roles[0].name;
          console.log(role_name) 
          this.id = this.authService.getAuthedUserID()
          console.log(this.id)
          
        }
    
    
    
    ngOnInit() {
      
       
       
    }

    toggleMenu(){
        this.showMenu = !this.showMenu;
        this.authService.userValue.username;
    }

      

    showDialog(id: number){
       this.route.navigate(['/account'])

    
    
  } 

  logout() {
    this.authService.logout();
    this.route.navigateByUrl('/auth/login');
  }


}
       
           

  

