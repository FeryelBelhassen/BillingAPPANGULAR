import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Facture } from '../../domain/facture';
import { FactureService } from '../../services/facture.service';
import { FactureAvoir } from '../../domain/factureavoir';
import { FactureAvoirService } from '../../services/factureavoir.service';
import { Client } from '../../domain/client';
import { ClientService } from '../../services/client.service';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';
import { FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './factureavoir.component.html',
    styleUrls: ['./factureavoir.component.css'],

    providers: [MessageService]
})
export class FactureAvoirComponent implements OnInit {

    DialogFactureAvoir: boolean = false;

    clientDialog: boolean = false;

    productDialog: boolean =false;

    deleteFactureDialog: boolean = false;

    deleteFacturesDialog: boolean = false;

    facturesavoir: FactureAvoir[] = [];

    factureavoir!: FactureAvoir ;

    client!: Client ;

    product!: Product;
    
    facturessavoir:Array<FactureAvoir> = [];

    selectedFactures: FactureAvoir[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    //products!: Product[];
   
    clients: Client[] | any;

    products: Product[] = [];

   
    MODE: string = 'CREATE';
    
    idToUpdate:number=NaN;

    idToDel:number=NaN;

    selectedProduct: any;


    productList: Product []=[{
        'code' : 0 , 'designation': '', 'quantity': 0 ,
        'supplier': '' , 'price': 0 
      }];


    constructor(private factureavoirService: FactureAvoirService, private messageService: MessageService, 
        private clientService: ClientService , private productService: ProductService , private fb:FormBuilder) { }

    ngOnInit() {
   
        this.getFacturesAvoir();

        this.cols = [
            { field: 'numfactureavoir', header: 'NumeroFactureAvoir' },
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

    private getFacturesAvoir(){
        this.factureavoirService.getAllFactureAvoir()
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.facturesavoir=data;
               
            })
            
        }

    openNew() {
        this.factureavoir={};
        this.submitted = false;
        this.MODE = 'CREATE';
        this.DialogFactureAvoir = true;
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


      editFactureAvoir(id:number, data: FactureAvoir) {
        this.factureavoir=data;
        this.DialogFactureAvoir = true; 
        this.idToUpdate = id;
        this.MODE = 'APPEND'      
     }

     deleteFactureAvoir(id: number) {
        this.deleteFactureDialog = true;
        this.factureavoir = { ...this.factureavoir }   
        this.idToDel  = id
    }

    confirmDelete() {
        this.deleteFactureDialog = false;
        this.facturessavoir = this.facturesavoir.filter(val => val.id !== this.factureavoir.id);
      
         this.factureavoirService.deleteFactureAvoir(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'FactureAvoir Deleted', life: 3000 });
            this.ngOnInit();   
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
          
        });
    }


    hideDialog() {
        this.DialogFactureAvoir = false;
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
   
    saveFactureAvoir() {
        
        /*const productList = Array (this.facture.product);
        console.log(productList)*/
        
            if (this.MODE === 'CREATE'){
             const toAdd: FactureAvoir = {
                'numfactureavoir': this.factureavoir.numfactureavoir,
                'client' :this.factureavoir.client ,
                'product':this.products,
                'datefacture' : this.factureavoir.datefacture,
                'montanttc': this.factureavoir.montanttc,
                'montantht': this.factureavoir.montantht
                };
                console.log(this.factureavoir)
        
             this.factureavoirService.createFactureAvoir(toAdd).subscribe( data =>{
                 console.log(data);
                 this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'FactureAvoir Created', life: 3000 });
                 this.DialogFactureAvoir = false;
                 this.ngOnInit();   
                 }, error => {
                     console.log(error);
                     this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                     this.DialogFactureAvoir = false;
                     } );

    }
    else if( this.MODE === 'APPEND') {
        const toEdit: FactureAvoir=  {
            'numfactureavoir': this.factureavoir.numfactureavoir,
            'client' :this.factureavoir.client ,
            'product':this.products,
            'datefacture' : this.factureavoir.datefacture,
            'montanttc': this.factureavoir.montanttc,
            'montantht': this.factureavoir.montantht
          }
        
        this.factureavoirService.updateFactureAvoir(this.idToUpdate, toEdit).subscribe( (data) =>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'FactureAvoir Updated', life: 3000 });
            this.DialogFactureAvoir = false;
            this.ngOnInit();   
          }, error => {
            console.log(error);
            this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
            this.DialogFactureAvoir = false;
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
        };
        this.products.push(product);
        this.productService.createProduct(product).subscribe( data =>{
        console.log(this.products.push(product));
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