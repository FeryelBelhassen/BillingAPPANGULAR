import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DevisService } from '../../services/devis.service';
import { Devis } from '../../domain/devis';
import { Client } from '../../domain/client';

@Component({
    templateUrl: './devis.component.html',
    providers: [MessageService]
})
export class DevisComponent implements OnInit {

    devisDialog: boolean = false;

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

    id!: number;

    constructor(private devisService: DevisService, private messageService: MessageService) { }

    ngOnInit() {
       
        this.cols = [
            { field: 'numerodevis', header: 'NumeroDevis' },
            { field: 'datedevis', header: 'DateDevis' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'price', header: 'Price' },
          
        ];

    this.getallDevis();
    }

    private getallDevis(){
        this.devisService.getAllDevis()
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.deviss=data;
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