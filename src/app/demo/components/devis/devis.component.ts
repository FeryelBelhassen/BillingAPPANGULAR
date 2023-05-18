import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DevisService } from '../../services/devis.service';
import { Devis } from '../../domain/devis';
import { Client } from '../../domain/client';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

@Component({
    templateUrl: './devis.component.html',
    providers: [MessageService]
})
export class DevisComponent implements OnInit {

    devisDialog: boolean = false;
    devisPrint :boolean =false;

    deleteDevisDialog: boolean = false;

    deleteDevissDialog: boolean = false;

    deviss: Devis[] = [];
   
    devis: Devis = {};


    selectedDevis: Devis[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    MODE: string = 'CREATE';

    idToDel:number=NaN;

    idToUpdate:number=NaN;

    idToget:number=NaN;

    id!: number;

    products: Product[] = [];

    constructor(private devisService: DevisService, private messageService: MessageService,
        private router: Router, private authService: AuthService, private userService: UserService,
        private productService: ProductService) { 
            this.id= this.authService.getAuthedUserID();
        }

    ngOnInit() {
       
        this.cols = [
            { field: 'numerodevis', header: 'NumeroDevis' },
            { field: 'datedevis', header: 'DateDevis' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'price', header: 'Price' },
          
        ];

        this.productService.getProducts().subscribe(data => {
            this.products = data;
           
        });

    this.getallDevis(this.id);
    }

    private getallDevis(id: number){
        this.idToget= id;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{
               
               if (data.roles[0].name ==='ADMIN' || data.roles[0].name ==='CLIENT' || data.roles[0].name ==='MAGASINIER'){
    
                        this.devisService.getAllDevis()
                            .subscribe((data)=>{
                            this.deviss=data;  
                            console.log("Array -> "+this.deviss)
                })
            
                } else{
                  //cas non
                  this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                  this.router.navigate(['/home'])
                }
           
          })
            
        }

    getDevis(id: number){
        this.devisService.getDevis(this.devis.id!).subscribe(data=>{
        this.deviss =data;
        console.log(data)
        },error=>{
            console.log(error);
    });
    
        }
    
    openNew() {
        this.devis = new Devis ();
        this.submitted = false;
        this.MODE = 'CREATE';
        this.devisDialog = true;
     }
    
     editDevis(id:number, data: Devis) {
        this.devis=data;
        this.devisDialog = true; 
        this.idToUpdate = id;
        this.MODE = 'APPEND'      
     }

    deleteDevis(id: number) {
        this.deleteDevisDialog = true;
        this.devis = { ...this.devis }   
        this.idToDel  = id
    }

    confirmDelete() {
        this.deleteDevisDialog = false;
        this.deviss = this.deviss.filter(val => val.id !== this.devis.id);
      
         this.devisService.deleteDevis(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devis Deleted', life: 3000 });
            this.ngOnInit();   
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
          
        });
    }

    printDevis(){
        
        this.devisPrint= true;
        console.log("DEVISSS");
        
    }

    print(){
        window.print()
    }

    hideDialog() {
        this.devisDialog = false;
        this.submitted = false;
    }

    saveDevis() {
        
        if (this.MODE === 'CREATE'){
         const toAdd: Devis = {
             'numerodevis': this.devis.numerodevis,
             'datedevis' :this.devis.datedevis ,
             //'product': this.devis.product as Product[],
             'quantity': this.devis.quantity,
             'price' : this.devis.price
             };
         this.devisService.createDevis(toAdd).subscribe( data =>{
             console.log(data);
             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devis Created', life: 3000 });
             this.devisDialog = false;
             this.ngOnInit();   
             }, error => {
                 console.log(error);
                 this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                 this.devisDialog = false;
                 } );
     }

     else if( this.MODE === 'APPEND') {
        const toEdit: Devis=  {
            'numerodevis': this.devis.numerodevis,
            'datedevis' :this.devis.datedevis ,
            'quantity': this.devis.quantity,
            'price' : this.devis.price
          }
        
        this.devisService.updateDevis(this.idToUpdate, toEdit).subscribe( (data) =>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devis Updated', life: 3000 });
            this.devisDialog = false;
            this.ngOnInit();   
          }, error => {
            console.log(error);
            this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
            this.devisDialog = false;
            } );
    }
    }
   
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}