import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Facture } from '../../domain/facture';
import { FactureService } from '../../services/facture.service';

@Component({
    templateUrl: './facture.component.html',
    providers: [MessageService]
})
export class FactureComponent implements OnInit {

    DialogFacture: boolean = false;

    deleteFactureDialog: boolean = false;

    deleteFacturesDialog: boolean = false;

    factures: Facture[] = [];

    facture: Facture = {};

    selectedFactures: Facture[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private factureService: FactureService, private messageService: MessageService) { }

    ngOnInit() {
   
        this.getFactures();

        this.cols = [
            { field: 'numerofacture', header: 'NumeroFacture' },
            { field: 'clientid', header: 'ClientID' },
            { field: 'datefacture', header: 'DateFacture' },
            { field: 'montantht', header: 'MontantHT'  },
            { field: 'montantttc', header: 'MonatntTTC' },
        ];

        
    }

    private getFactures(){
        this.factureService.getAllFactures()
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.factures=data;
            })
            
        }

    openNew() {
        this.facture = {};
        this.submitted = false;
        this.DialogFacture = true;
    }

    deleteSelectedFactures() {
        this.deleteFacturesDialog = true;
    }

    editFacture(facture: Facture) {
        this.facture = { ...facture };
        this.DialogFacture = true;
    }

    deleteFacture(facture: Facture) {
        this.deleteFactureDialog = true;
        this.facture = { ...facture };
    }

    confirmDeleteSelected() {
        this.deleteFacturesDialog = false;
        this.factures = this.factures.filter(val => !this.selectedFactures.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Factures Deleted', life: 3000 });
        this.selectedFactures = [];
    }

    confirmDelete() {
        this.deleteFactureDialog = false;
        this.factures = this.factures.filter(val => val.numerofacture !== this.facture.numerofacture);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Deleted', life: 3000 });
        this.facture = {};
    }

    hideDialog() {
        this.DialogFacture = false;
        this.submitted = false;
    }

    saveFacture() {
        this.submitted = true;
       if (this.facture.clientid) {
            if (this.facture.id) {
                // @ts-ignore
                this.factures[this.findIndexById(this.facture.id)] = this.facture;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Updated', life: 3000 });
            } else {
                this.facture.id = this.createId();
                this.facture.numerofacture;
                this.facture.clientid ;
                this.facture.datefacture ;
                this.facture.montanttc ;
                this.facture.montantht ;
                 
                // @ts-ignore
                this.factures.push(this.facture);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Created', life: 3000 });
            }
            
            this.factures = [...this.factures];
            this.DialogFacture = false;
            this.facture = {};
        } 
        

    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.factures.length; i++) {
            if (this.factures[i].id === id) {
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