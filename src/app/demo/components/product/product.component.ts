import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from '../../services/product.service';

@Component({
    templateUrl: './product.component.html',
    providers: [MessageService]
})
export class ProductComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        ///this.productService.getProducts().then(data => this.products = data);
        this.getProducts();

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'designation', header: 'Designation' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'supplier', header: 'Supplier' },
            { field: 'price', header: 'Price' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    private getProducts(){
        this.productService.getProducts()
        .subscribe((data)=>{
            console.log("hello !"+data)
                this.products=data;
            })
            
        } 

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    saveProduct() {
        const product: Product = {
            //id: this.user.id,
            'code':this.product.code,
            'designation':this.product.designation ,
            'quantity':this.product.quantity ,
            'supplier': this.product.supplier ,
            'price': this.product.price 
          };

          this.productService.createProduct(product).subscribe( data =>{
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            this.ngOnInit();
            
          },
          error => console.log(error));
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });

        this.productDialog = false;
      } 
   /* saveProduct() {
        this.submitted = true;

        if (this.product.designation?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                //this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code;
                this.product.designation ;
                this.product.quantity ;
                this.product.supplier ;
                this.product.price ;
                 
                // @ts-ignore
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }*/

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
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