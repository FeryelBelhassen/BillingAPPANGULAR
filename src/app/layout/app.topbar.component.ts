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
  
    user!:User;

    currentUser!: User | null;

   
      
    constructor(public layoutService: LayoutService, private authService: AuthService,
        private route: Router, private userService: UserService, private http: HttpClient,) { 
          this.username = this.authService.getUsername();
           console.log(this.username)
          var role_name =this.authService.UserRole.roles[0].name;
          console.log(role_name) 
          
        }
    
    
    
    ngOnInit() {
      //this.user = this.userService.getUser();
      console.log(this.user)
       
       
    }
    toggleMenu(){
        this.showMenu = !this.showMenu;
        this.authService.userValue.username;
    }

    
      

    get(){
     
      this.userService.getUser();

      console.log( "feryel",this.userService.getUser());
    }


    

    logout() {
      this.authService.logout();
      this.route.navigateByUrl('/auth/login');
    }

    showDialog(){
      this.userService.getUser().subscribe((users)=>{
        this.username;
        
        console.log("Array -> "+this.username)
      
    })
    
} 

 }
       
           

  

