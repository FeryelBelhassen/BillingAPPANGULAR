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

    editFormOpen = false;

    showMenu = false;
    items!: MenuItem[];
    userValue!: Useer;
    visible!: boolean;
    sidebarVisible!: boolean;
    username: string;
    
    id!:number;

    user!:User;

    MODE: string = 'CREATE';

    idToUpdate:number=NaN;

    //formGroup: 

    roles: Role[] = [
      { id: 1, name: "ADMIN" },
      { id: 2, name: "AGENT" },
      { id: 3, name: "USER" },
      { id: 4, name: "MAGASINIER" },
      { id: 5, name: "CLIENT" }
    ];
 
    
    constructor(public layoutService: LayoutService, private authService: AuthService,
        private route: Router, private userService: UserService, private http: HttpClient,) { 
          this.username = authService.getUsername();
        console.log(this.username)
        }
    
    
    
    ngOnInit() {
       /* this.loggedInUser = this.authService.getLoggedInUser();*/
/*this.formGroup = this.formBuilder.group({
        name: [''],
        email: [''],
        // Autres champs du formulaire
      });*/
       
       
    }
    toggleMenu(){
        this.showMenu = !this.showMenu;
        this.authService.userValue.username;
    }

    getUserDetails() {
      const userId = this.authService.getUserId();
        console.log(userId)
    }

    
    
    
      
    
    

    get(){
     
      this.userService.getUser(this.id);
      //console.log( "feryel",this.userService.getUser(this.id));
    }

    hideDialog(){
      this.editFormOpen = false;
        
    }

    editUser(id:number, data: User) {
      const toEdit: User=  {
        'username' : this.user.username,
        'email' :this.user.email ,
        'password': this.user.password,
        'roles' : this.user.roles// Set<Role> -- table mtaa role
      }
      this.editFormOpen = true;
     // this.userDialog = true; 
      this.idToUpdate = id;
      this.userService.getUser(id);
      //this.MODE = 'APPEND' 
      toEdit!= data;
    
    this.userService.updateUser(this.idToUpdate, toEdit).subscribe( (data) =>{
//this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        this.editFormOpen = false;
        this.ngOnInit();   
      }, error => {
        console.log(error);
//this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
        this.editFormOpen = false;
        } );
}     
   

   openEditForm() {
    this.editFormOpen=true;
  
     
    }

    saveUser(){
       if( this.MODE === 'APPEND') {
        const toEdit: User=  {
            'username' : this.user.username,
            'email' :this.user.email ,
            'password': this.user.password,
            'roles' : this.user.roles// Set<Role> -- table mtaa role
          }
        
        this.userService.updateUser(this.idToUpdate, toEdit).subscribe( (data) =>{
//this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            this.editFormOpen = false;
            this.ngOnInit();   
          }, error => {
            console.log(error);
//this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
            this.editFormOpen = false;
            } );
    }
    }


    logout() {
      this.authService.logout();
      this.route.navigateByUrl('/auth/login');
    }
       
       
     
      

    
}
  

