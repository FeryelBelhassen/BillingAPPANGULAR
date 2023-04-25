import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DevisService } from '../../services/devis.service';
import { Devis } from '../../domain/devis';

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

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private devisService: DevisService, private messageService: MessageService) { }

    ngOnInit() {
        ///this.productService.getProducts().then(data => this.products = data);
        

        this.cols = [
            { field: 'numerodevis', header: 'NumeroDevis' },
            { field: 'datedevis', header: 'DateDevis' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'price', header: 'Price' },
          
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

    this.getDevis();
    }

    private getDevis(){
        this.devisService.getAllDevis()
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.deviss=data;
            })
            
        }

    openNew() {
        this.devis = {};
        this.submitted = false;
        this.devisDialog = true;
    }

    deleteSelectedDevis() {
        this.deleteDevisDialog = true;
    }

    editDevis(devis: Devis) {
        this.devis = { ...devis };
        this.devisDialog = true;
    }

    deleteDevis(devis: Devis) {
        this.deleteDevisDialog = true;
        this.devis = { ...devis };
    }

    printDevis(){
        window.print()
      }

    confirmDeleteSelected() {
        this.deleteDevisDialog = false;
        this.deviss = this.deviss.filter(val => !this.selectedDevis.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devis Deleted', life: 3000 });
        this.selectedDevis = [];
    }

    confirmDelete() {
        this.deleteDevisDialog = false;
        this.deviss = this.deviss.filter(val => val.id !== this.devis.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devis Deleted', life: 3000 });
        this.devis = {};
    }

    hideDialog() {
        this.devisDialog = false;
        this.submitted = false;
    }

    saveDevis() {
        this.submitted = true;

        if (this.devis.numerodevis?.trim()) {
            if (this.devis.id) {
                // @ts-ignore
                //this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.deviss[this.findIndexById(this.devis.id)] = this.devis;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                //this.devis.id ;
                this.devis.numerodevis ;
                this.devis.datedevis ;
                this.devis.quantity ;
                this.devis.price ;
                
                 
                // @ts-ignore
                this.deviss.push(this.devis);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devis Created', life: 3000 });
            }

            this.deviss = [...this.deviss];
            this.devisDialog = false;
            this.devis = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.deviss.length; i++) {
            if (this.deviss[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

   

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}