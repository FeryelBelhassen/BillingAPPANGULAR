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
import { CurrencyPipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
//import * as jsPDF from 'jspdf';
import { jsPDF } from "jspdf";
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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

    facture!: Facture | any ;

    client!: Client ;

    product!: Product;
    
    facturess:Array<Facture> = [];

    selectedFactures: Facture[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
   
    clients: Client[] | any;

    products: Product[] = [];
    
    MODE: string = 'CREATE';
    
    idToUpdate:number=NaN;

    idToDel:number=NaN;

    idToget:number=NaN;

    selectedProduct: any;

    selectedProducts = []

    formGroup!: FormGroup;

    id: number;

   // selectedProducts: Product[] = [];

    
    constructor(private factureService: FactureService, private messageService: MessageService, 
        private clientService: ClientService , private productService: ProductService , private fb:FormBuilder,
        private http: HttpClient, private authService: AuthService, private userService: UserService,
        private router: Router) { 
            this.id = this.authService.getAuthedUserID()
        }
    
         
    
    ngOnInit() {
    
        this.getFactures(this.id);
       
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

        

    getFactures(id: number){
        this.idToget= id;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{
               
               if (data.roles[0].name ==='ADMIN' || data.roles[0].name ==='CLIENT'){
                  this.factureService.getAllFactures()
                     .subscribe((data)=>{
                        this.factures=data;  
                        console.log("Array -> "+this.factures)
                })      
              
                } else{
                  //cas non
                  this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                  this.router.navigate(['/home'])
                }
           
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

    print(){
        window.print()
      }

    printFacture(id: number) {
        this.http.get<Facture>(`/factures/${id}`).subscribe(facture => {
            const doc = new jsPDF();
            doc.text(`Facture #${facture.id}`, 10, 10);
            doc.text(`Client: ${facture.client}`, 10, 20);
            doc.text(`Product: ${facture.product}`, 10, 30);
            doc.text(`Date: ${facture.datefacture}`, 10, 40);
            doc.text(`Montanttc: ${facture.montanttc}`, 10, 50);
            doc.text(`Montantht: ${facture.montantht}`, 10, 60);
            doc.save(`facture-${facture.id}.pdf`);
          });
        }
        
      
      


    editFacture(id:number, data:Facture) {
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
                'product': this.facture.product as Product[],
                'datefacture' : this.facture.datefacture,
                'montanttc': this.facture.montanttc,
                'montantht': this.facture.montantht
                };
                console.log(this.facture)
                        
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
    else if( this.MODE === 'APPEND') {
        const toEdit: Facture=  {
            'numerofacture': this.facture.numerofacture,
            'client' :this.facture.client ,
            'product':this.products,
            'datefacture' : this.facture.datefacture,
            'montanttc': this.facture.montanttc,
            'montantht': this.facture.montantht
          }
        
        this.factureService.updateFacture(this.idToUpdate, toEdit).subscribe( (data) =>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Updated', life: 3000 });
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