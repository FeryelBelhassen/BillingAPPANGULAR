import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Facture } from '../../domain/facture';
import { FactureService } from '../../services/facture.service';
import { FactureAvoir } from '../../domain/factureavoir';
import { FactureAvoirService } from '../../services/factureavoir.service';

@Component({
    templateUrl: './factureavoir.component.html',
    providers: [MessageService]
})
export class FactureAvoirComponent implements OnInit {

    DialogFacture: boolean = false;

    deleteFactureDialog: boolean = false;

    deleteFacturesDialog: boolean = false;

    facturesAvoir: FactureAvoir[] = [];

    factureAvoir: FactureAvoir = {};

    selectedFactures: FactureAvoir[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private factureavoirService: FactureAvoirService, private messageService: MessageService) { }

    ngOnInit() {
   
        this.getFacturesAvoir();

        this.cols = [
            { field: 'numerofactureavoir', header: 'NumeroFactureavoir' },
            { field: 'clientid', header: 'ClientID' },
            { field: 'datefacture', header: 'DateFacture' },
            { field: 'designation', header: 'Designation' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'montantht', header: 'MontantHT'  },
            { field: 'montantttc', header: 'MonatntTTC' },
        ];

        
    }

    private getFacturesAvoir(){
        this.factureavoirService.getAllFactureAvoir()
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.facturesAvoir=data;
            })
            
        }

    openNew() {
        this.factureAvoir = {};
        this.submitted = false;
        this.DialogFacture = true;
    }

    deleteSelectedFactures() {
        this.deleteFacturesDialog = true;
    }

    editFactureAvoir(factureavoir: FactureAvoir) {
        this.factureAvoir = { ...factureavoir };
        this.DialogFacture = true;
    }

    deleteFactureAvoir(factureavoir: FactureAvoir) {
        this.deleteFactureDialog = true;
        this.factureAvoir = { ...factureavoir };
    }

    confirmDeleteSelected() {
        this.deleteFacturesDialog = false;
        this.facturesAvoir = this.facturesAvoir.filter(val => !this.selectedFactures.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'FactureAvoir Deleted', life: 3000 });
        this.selectedFactures = [];
    }

    confirmDelete() {
        this.deleteFactureDialog = false;
        this.facturesAvoir = this.facturesAvoir.filter(val => val.numfactureavoir !== this.factureAvoir.numfactureavoir);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Deleted', life: 3000 });
        this.factureAvoir = {};
    }

    hideDialog() {
        this.DialogFacture = false;
        this.submitted = false;
    }

    saveFacture() {
        this.submitted = true;
       if (this.factureAvoir.clientid) {
            if (this.factureAvoir.idfactavoir) {
                // @ts-ignore
                this.factures[this.findIndexById(this.facture.id)] = this.facture;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Facture Updated', life: 3000 });
            } else {
                this.factureAvoir.idfactavoir = this.createId();
                this.factureAvoir.numfactureavoir;
                this.factureAvoir.clientid ;
                this.factureAvoir.datefacture ;
                this.factureAvoir.designation ;
                this.factureAvoir.quantity ;
                this.factureAvoir.montanttc ;
                this.factureAvoir.montantht ;
                 
                // @ts-ignore
                this.facturesAvoir.push(this.factureAvoir);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'FactureAvoir Created', life: 3000 });
            }
            
            this.facturesAvoir = [...this.facturesAvoir];
            this.DialogFacture = false;
            this.factureAvoir = {};
        } 
        

    }

    findIndexById(idfactavoir: string): number {
        let index = -1;
        for (let i = 0; i < this.facturesAvoir.length; i++) {
            if (this.facturesAvoir[i].idfactavoir === idfactavoir) {
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