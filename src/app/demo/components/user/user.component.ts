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
import { AuthService } from '../../services/auth.service';

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
    
    MODE: string = 'CREATE';
  

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

    id!: number;

    idToget: number=NaN;
    
    
    rowsPerPageOptions = [5, 10, 20];
    


    constructor(private userService: UserService, private messageService: MessageService,
        public formBuilder: FormBuilder, public router:Router, public authService: AuthService) { 
            this.id = this.authService.getAuthedUserID()
        }
      

    ngOnInit() {   
       
        
            this.cols = [
                { field: 'name', header: 'Name' },
                { field: 'email', header: 'Email' },
                { field: 'role', header: 'Role' }
            ];

           

        this.getUsers(this.id);
        }
     
        getUsers(id: number){
            this.idToget= id;
            this.userService.getUserById(this.idToget)
                .subscribe((data)=>{
                   
                   if (data.roles[0].name ==='ADMIN'){

                    this.userService.getAllUsers()
                        .subscribe((users)=>{
                            this.users=users;  
                            console.log("Array -> "+this.users)
                    })
                    } else{
                      //cas non
                      //this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                      this.router.navigate(['/auth/error'])
                    }
               
              })
            }

    openNew() {
        this.user = new User(NaN, '', '', '', []);
        this.submitted = false;
        this.MODE = 'CREATE';
        this.userDialog = true;
    }

    editUser(id:number, data: User) {
        this.user=data;
        this.userDialog = true; 
        this.idToUpdate = id;
        this.MODE = 'APPEND'      
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
            
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
            this.ngOnInit();   
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Erreur de suppression! ', life: 3000 });
          
        });
    }

       

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        
       if (this.MODE === 'CREATE'){
        const toAdd: User = {
            'username': this.user.username,
            'email' :this.user.email ,
            'password': this.user.password,
            'roles' : this.user.roles// Set<Role> -- table mtaa role
            };
        this.userService.createUser(toAdd).subscribe( data =>{
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur ajouté', life: 3000 });
            this.userDialog = false;
            this.ngOnInit();   
            }, error => {
                console.log(error);
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Erreur d\'ajout! ', life: 3000 });
                this.userDialog = false;
                } );
            


    } else if( this.MODE === 'APPEND') {
        const toEdit: User=  {
            'username' : this.user.username,
            'email' :this.user.email ,
            'password': this.user.password,
            'roles' : this.user.roles// Set<Role> -- table mtaa role
          }
        
        this.userService.updateUser(this.idToUpdate, toEdit).subscribe( (data) =>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000 });
            this.userDialog = false;
            this.ngOnInit();   
          }, error => {
            console.log(error);
            this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Erreur de modification! ', life: 3000 });
            this.userDialog = false;
            } );
    }
        
    }
        

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}