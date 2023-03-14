import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user.service';
import { User } from '../../api/user';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService]
})
export class UserComponent implements OnInit {
 
    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    deleteUserssDialog: boolean = false;

    users: User[] = [];

    user: User = {};
    MODE: string = 'APPEND' // 'DELETE' - 'CREATE'
     
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
        this.userService.getAllUsers().subscribe(users =>{ 
            this.users = users
            console.log(users)
        });

        this.cols = [
            { field: 'username', header: 'Username' },
            { field: 'email', header: 'Email' },
            { field: 'password', header: 'Password' },
            //{ field: 'telephone', header: 'Telephone' },
          
        ];

        this.roles = [
            { id: 1, name: "Admin" },
            { id: 2, name: "Agent" },
            { id: 3, name: "User" },
            { id: 4, name: "Magasinier" },
            { id: 5, name: "Client" }
           
        ];
    }

    openNew() {
        this.user = {};
        this.MODE = 'CREATE'
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUserDialog = true;
    }

    editUser(user: User) {
        this.MODE = 'APPEND'
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
        console.log('User Deleted');
     
    /*this.userService.deleteUser(user)
      .subscribe( data => {
        this.ngOnInit();
        alert("User Deleted successfully.");
      });*/
    }

    confirmDeleteSelected() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.id !== this.user.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.user = {};
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.MODE === 'APPEND') {
            // @ts-ignore
            this.user.role = this.user.role.value ? this.user.role.value : this.user.role;
           // this.users[this.findIndexById(this.user.id)] = this.user;
            this.userService.updateUser(this.user).subscribe(value=>{
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Successful',
                     detail: 'User Updated', 
                     life: 3000 });
                });
        } else {
            this.user.username = this.createId();
            this.user.email = this.createId();
            this.user.password = this.createId();
            this.user.role = this.user.role ? this.user.role : 'ADMIN';
            this.users.push(this.user);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        
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
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}