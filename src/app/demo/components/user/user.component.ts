import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user.service';
import { User } from '../../domain/user';
import { Observable } from 'rxjs';
//import { Role } from '../../domain/ERole';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ERole } from '../../domain/Erole';
import { Role } from '../../domain/Role';
import { error } from 'console';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})
export class UserComponent implements OnInit {

    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    users:Array<User> = [];

    user!: User ;

    half_cast: any =  [];
  

    roles: Role[] = [
        { id: 1, name: "ADMIN" },
        { id: 2, name: "AGENT" },
        { id: 3, name: "USER" },
        { id: 4, name: "MAGASINIER" },
        { id: 5, name: "CLIENT" }
      ];


    selectedUsers: User[] = [];

    submitted: boolean = false;

    cols: any[] = [];
    idToDel:number=NaN;
    idToUpdate:number=NaN;

    /*userUpdated: User={
        username: this.user.username,
        email:this.user.email,
        password:this.user.password,
        roles: this.user.roles
    }*/
    userUp: User = {
        username: '',
        email:'',
        password: '',
        roles: []
      }
      searchText: any;
    rowsPerPageOptions = [5, 10, 20];


    constructor(private userService: UserService, private messageService: MessageService,
        public formBuilder: FormBuilder, public router:Router) { 
        }

    ngOnInit() {   
       
        
            this.cols = [
                { field: 'name', header: 'Name' },
                { field: 'email', header: 'Email' },
                { field: 'role', header: 'Role' }
            ];

           

        this.getUsers();
    }

    private getUsers(){
        this.userService.getAllUsers()
        .subscribe((users)=>{
                this.users=users;  
                console.log("Array -> "+this.users)
            })
            
        } 
    
        
    getUser(id: number){
        this.userService.getUser(this.user.id!).subscribe(data=>{
            this.users =data;
            console.log(data)
        },error=>{
            console.log(error);
        });

    }
    openNew() {
        this.user = new User();
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(data: User) {
        this.user = data;
        this.userDialog = true; 
        //this.idToUpdate = id;
        
        const user: User=  {
            'username' : data.username,
            'email' :data.email ,
            'password': data.password,
            'roles' : data.roles// Set<Role> -- table mtaa role
          }
           console.log(data)
            this.userService.updateUser(user).subscribe( (data) =>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                this.ngOnInit();   
              }, error => {
                console.log(error);
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                } );
     }
        
    deleteUser(id: number) {
        this.deleteUserDialog = true;
        this.user = { ...this.user }   
        this.idToDel  = id
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.id !== this.user.id);
         this.userService.deleteUser(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            this.ngOnInit();   
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
          
          });
    }
    

    deleteSelectedUsers(id: number) {
        this.deleteUsersDialog = true;
        this.idToDel  = id
  
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.userService.deleteUser(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
            this.ngOnInit();   
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
          
          });
       
        }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        const user: User = {
            'username': this.user.username,
            'email' :this.user.email ,
            'password': this.user.password,
            'roles' : this.user.roles// Set<Role> -- table mtaa role
            };
        this.userService.createUser(user).subscribe( data =>{
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        this.userDialog = false;
        this.ngOnInit();   
        }, error => {
            console.log(error);
            this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
            this.userDialog = false;
            } );
        }
        
           
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}