import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClientService } from '../../services/client.service';
import { Client } from '../../domain/client';
import { Observable } from 'rxjs';

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

    constructor(private clientService: ClientService, private messageService: MessageService) { }

    ngOnInit() {   
        
            this.cols = [
                { field: 'name', header: 'Name' },
                { field: 'email', header: 'Email' },
                { field: 'adresse', header: 'Adresse' },
                { field: 'telephone', header: 'Telephone' }
            ];
    
    this.getClients();
    }

    private getClients(){
        this.clientService.getAllClients()
        .subscribe((data)=>{
        this.clients=data;
         })
                
    }
    
    openNew() {
        this.client = {};
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedClients() {
        this.deleteClientsDialog = true;
    }

    editClient(id: number, data: Client) {
        this.client = data;
        this.clientDialog = true; 
        this.idToUpdate = id;
        
        const client: Client=  {
            'username' : data.username,
            'email' :data.email ,
            'password': data.password,
            'adresse' : data.adresse,
            'telephone': data.telephone
          }
           console.log(data)
            this.clientService.updateClient(this.idToUpdate,client).subscribe( (data) =>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
                this.ngOnInit();   
              }, error => {
                console.log(error);
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                } );
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

    deleteSelectedClient() {
        this.deleteClientsDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteClientsDialog = false;
        this.clients = this.clients.filter(val => !this.selectedClients.includes(val));
        this.clientService.deleteAllClients().subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clients Deleted', life: 3000 });
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
        const client: Client = {
            'username': this.client.username,
            'email' :this.client.email ,
            'password': this.client.password,
            'adresse' : this.client.adresse,
            'telephone': this.client.telephone
            };
       
        this.clientService.createClient(client).subscribe( data =>{
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
        this.clientDialog = false;
        this.ngOnInit();   
        }, error => {
            console.log(error);
            this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
            this.clientDialog = false;
            } );
        
    }

   
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}