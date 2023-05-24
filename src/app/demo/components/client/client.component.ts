import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClientService } from '../../services/client.service';
import { Client } from '../../domain/client';
import { Observable } from 'rxjs';
import { Facture } from '../../domain/facture';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: './client.component.html',
    providers: [MessageService]
})
export class ClientComponent implements OnInit {

    clientDialog: boolean = false;

    deleteClientDialog: boolean = false;

    deleteClientsDialog: boolean = false;

    clients:Array<Client> = [];

    client: Client = {};

    half_cast: any =  [];

    selectedClients: Client[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    idToDel:number=NaN;

    idToUpdate:number=NaN;

    idToget:number=NaN;

    id!: number;

    DialogFacture: boolean = false;

    productDialog: boolean =false;

    deleteFactureDialog: boolean = false;

    deleteFacturesDialog: boolean = false;

    factures: Facture[] = [];

    facture!: Facture ;

    product!: Product;

    facturess:Array<Facture> = [];

    MODE: string = 'CREATE';


    constructor(private clientService: ClientService, private messageService: MessageService,
         private router:Router, private authService: AuthService, private userService: UserService) {
             this.id = this.authService.getAuthedUserID()  }

    ngOnInit() {

            this.cols = [
                { field: 'name', header: 'Name' },
                { field: 'email', header: 'Email' },
                { field: 'adresse', header: 'Adresse' },
                { field: 'telephone', header: 'Telephone' }
            ];

    this.getClients(this.id);
    }

    getClients(id: number){
        this.idToget= id;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{

               if (data.roles[0].name ==='ADMIN' || data.roles[0].name ==='AGENT'){

                this.clientService.getAllClients()
                    .subscribe((clients)=>{
                        this.clients=clients;
                        console.log("Array -> "+this.clients)
                })
                } else{
                  //cas non
                  this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                  this.router.navigate(['/home'])
                }

          })
        }


    openNew() {
        this.client = {};
        this.submitted = false;
        this.MODE = 'CREATE';
        this.clientDialog = true;
    }


    editClient(id:number, data: Client) {
        this.client=data;
        this.clientDialog = true;
        this.idToUpdate = id;
        this.MODE = 'APPEND'
     }


     deleteClient(id: number) {
        this.deleteClientDialog = true;
        this.client = { ...this.client }
        this.idToDel  = id
    }

    confirmDelete() {
        this.deleteClientDialog = false;
        this.clients = this.clients.filter(val => val.id !== this.client.id);

         this.clientService.deleteClient(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
            this.ngOnInit();
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });

        });
    }


    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }

    saveClient() {
        if (this.MODE === 'CREATE'){
            const toAdd: Client = {
                'username': this.client.username,
                'email' :this.client.email ,
                'password': this.client.password,
                'adresse' : this.client.adresse,
                'telephone': this.client.telephone
                };
            this.clientService.createClient(toAdd).subscribe( data =>{
                console.log(data);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
                this.clientDialog = false;
                this.ngOnInit();
                }, error => {
                    console.log(error);
                    this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                    this.clientDialog = false;
                    } );



        } else if( this.MODE === 'APPEND') {

            const toEdit: Client=  {
                'username': this.client.username,
                'email' :this.client.email ,
                'password': this.client.password,
                'adresse' : this.client.adresse,
                'telephone': this.client.telephone
              }

            this.clientService.updateClient(this.idToUpdate,toEdit).subscribe( (data) =>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
                this.clientDialog = false;
                this.ngOnInit();
              }, error => {
                console.log(error);
                this.clientDialog = false;
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                } );
        }

    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
