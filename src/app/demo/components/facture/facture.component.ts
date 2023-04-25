import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Facture } from '../../domain/facture';
import { FactureService } from '../../services/facture.service';
import { Client } from '../../domain/client';
import { ClientService } from '../../services/client.service';
import { Product } from '../../domain/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
    templateUrl: './facture.component.html',
    styleUrls: ['./facture.component.css'],
    providers: [MessageService]
})
export class FactureComponent implements OnInit {

    DialogFacture: boolean = false;

    clientDialog: boolean = false;

    productDialog: boolean =false;

    deleteFactureDialog: boolean = false;

    deleteFacturesDialog: boolean = false;

    factures: Facture[] = [];

    facture!: Facture ;

    client!: Client ;

    product!: Product;
    
    facturess:Array<Facture> = [];

    selectedFactures: Facture[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    products: Product[] | any;
   
    clients: Client[] | any;

    MODE: string = 'CREATE';
    
    idToUpdate:number=NaN;

    idToDel:number=NaN;

    selectedProduct: any;

    formGroup!: FormGroup;

    constructor(private factureService: FactureService, private messageService: MessageService, 
        private clientService: ClientService , private productService: ProductService , private fb:FormBuilder) { }

    ngOnInit() {
   
        this.getFactures();

        this.cols = [
            { field: 'numerofacture', header: 'NumeroFacture' },
            { field: 'client', header: 'Client' },
            { field: 'product', header: 'Product' },
            { field: 'datefacture', header: 'DateFacture' },
            { field: 'montantht', header: 'MontantHT'  },
            { field: 'montantttc', header: 'MonatntTTC' },
        ];

        this.productService.getProducts().subscribe(data => {
            this.products = data;
        });

        this.clientService.getAllClients().subscribe(data => {
            this.clients = data;
        });
    }

    

    private getFactures(){
        this.factureService.getAllFactures()
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.factures=data;
            })
            
        }

    openNew() {
        this.facture={};
        this.submitted = false;
        this.MODE = 'CREATE';
        this.DialogFacture = true;
     }

     ajouterClient(){
        this.client={};
        this.submitted = false;
        this.MODE = 'CREATE';
        this.clientDialog = true;
     }
    

    ajouterProduct(){
        this.product={};
        this.submitted = false;
        this.MODE = 'CREATE';
        this.productDialog = true;
    }

    printFacture(){
        window.print()
      }


      editFacture(id:number, data: Facture) {
        this.facture=data;
        this.DialogFacture = true; 
        this.idToUpdate = id;
        this.MODE = 'APPEND'      
     }

    deleteFacture(id: number) {
        this.deleteFactureDialog = true;
        this.facture = { ...this.facture }   
        this.idToDel  = id
    }

    confirmDelete() {
        this.deleteFactureDialog = false;
        this.factures = this.factures.filter(val => val.id !== this.facture.id);
      
         this.factureService.deleteFacture(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Deleted', life: 3000 });
            this.ngOnInit();   
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
          
        });
    }


    confirmDeleteSelected() {
        this.deleteFacturesDialog = false;
        this.factures = this.factures.filter(val => !this.selectedFactures.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Factures Deleted', life: 3000 });
        this.selectedFactures = [];
    }

   

    hideDialog() {
        this.DialogFacture = false;
        this.submitted = false;
    }

    hideDialogClient() {
        this.clientDialog = false;
        this.submitted = false;
    }

    hideDialogProduct() {
        this.productDialog = false;
        this.submitted = false;
    }
   
    saveFacture() {
        
            if (this.MODE === 'CREATE'){
             const toAdd: Facture = {
                'numerofacture': this.facture.numerofacture,
                'client' :this.facture.client ,
                'product': this.facture.product,
                'datefacture' : this.facture.datefacture,
                'montanttc': this.facture.montanttc,
                'montantht': this.facture.montantht
                };
             this.factureService.createFacture(toAdd).subscribe( data =>{
                 console.log(data);
                 this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Created', life: 3000 });
                 this.DialogFacture = false;
                 this.ngOnInit();   
                 }, error => {
                     console.log(error);
                     this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                     this.DialogFacture = false;
                     } );

    }
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

    saveProduct() {
        const product: Product = {
            'code':this.product.code,
            'designation':this.product.designation ,
            'quantity':this.product.quantity ,
            'supplier': this.product.supplier ,
            'price': this.product.price ,
            'inventoryStatus': this.product.inventoryStatus
            };
        this.productService.createProduct(product).subscribe( data =>{
        console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        this.productDialog = false;
        this.ngOnInit();   
        }, error => {
            console.log(error);
            this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
            this.productDialog = false;
            } );
    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}