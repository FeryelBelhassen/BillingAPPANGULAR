import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user.service';
import { User } from '../../domain/user';
import { Observable } from 'rxjs';
import { Role } from '../../domain/Role';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

    //users: Observable<User[]>;

    roles = [
        { id: 3, name: "User" },
        { id: 1, name: "Admin" },
        { id: 2, name: "Agent" },
        { id: 4, name: "Magasinier" },
        { id: 5, name: "Client" }
      ];
    

    selectedUsers: User[] = [];

    submitted: boolean = false;

    cols: any[] = [];


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
    
            this.roles = [
                { id: 1, name: "ADMIN" },
                { id: 2, name: "AGENT" },
                { id: 3, name: "USER" },
                { id: 4, name: "MAGASINIER" },
                { id: 5, name: "CLIENT" }
               
            ];

        this.getUsers();
    }

    private getUsers(){
        this.userService.getAllUsers()
        .subscribe((users)=>{
            console.log("hello !"+users)
                this.users=users;
                
                console.log("Array -> "+this.users)
            })
            
        } 
       
   
   
    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
        this.userService.deleteUser(user)
      .subscribe( data => {
        this.ngOnInit();
        alert("User Deleted successfully.");
      });
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.userService.deleteUser(this.user).subscribe(data => {
            this.ngOnInit();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
            this.selectedUsers = [];
        });

        }
       
    

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.id !== this.user.id);
        this.userService.deleteUser(this.user).subscribe(data => {
            this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        this.user = {};
    })

}

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }
    saveUser() {
        const user: User = {
            //id: this.user.id,
            'username': this.user.username,
            'email' :this.user.email ,
            'appRoles' :this.user.appRoles
          };

          this.userService.createUser(user).subscribe( data =>{
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            this.ngOnInit();
            
          },
          error => console.log(error));
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });

        this.userDialog = false;
      } 
           
         
    /*saveUser() {
        this.submitted = true;

        if (this.user.username?.trim()) {
            if (this.user.id) {
                // @ts-ignore
                //this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.users[this.findIndexById(this.user.id)] = this.user;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            } else {
                this.user.id;
                this.user.username ;
                this.user.email ;
                this.user.appRoles;
                // @ts-ignore
                this.users.push(this.user);
                console.log("done !")
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        }
    }*/
    

    

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = '0';
        for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
       }
        return id;
    }

   
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}