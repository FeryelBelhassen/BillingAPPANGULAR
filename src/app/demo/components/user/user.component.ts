import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user.service';
import { User } from '../../domain/user';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})
export class UserComponent implements OnInit {

    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    users:Array<User> = [];
    usersData  = {};

    user: User = {};

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

    constructor(private userService: UserService, private messageService: MessageService) { }

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
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.users=data;
                this.usersData=data
                console.log("data ! -> "+this.usersData)

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
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.id !== this.user.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        this.user = {};
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.username?.trim()) {
            if (this.user.id) {
                // @ts-ignore
                //this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.users[this.findIndexById(this.user.id)] = this.user;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            } else {
                this.user.id = this.createId();
                this.user.username ;
                this.user.email ;
                this.user.appRoles;
                //this.user.role = this.user.role ? this.user.role : 'ADMIN';    
                // @ts-ignore
                this.users.push(this.user);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        }
    }

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