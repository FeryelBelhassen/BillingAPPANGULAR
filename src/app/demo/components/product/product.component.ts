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

    idToDel:number=NaN;

    idToUpdate:number=NaN;

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

    editProduct(id: number, data: Product) {
        this.product = data;
        this.productDialog = true; 
        this.idToUpdate = id;
        
        const product: Product=  {
            'code' : data.code,
            'designation' :data.designation ,
            'quantity': data.quantity,
            'supplier' : data.supplier
          }
           console.log(data)
            this.productService.updateProduct(this.idToUpdate,product).subscribe( (data) =>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                this.ngOnInit();   
              }, error => {
                console.log(error);
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                } );
     }

     deleteProduct(id: number) {
        this.deleteProductDialog = true;
        this.product = { ...this.product }   
        this.idToDel  = id
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
         this.productService.deleteProduct(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.ngOnInit();   
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
          
          });
     }


    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

   

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
   
    saveProduct() {
        const product: Product = {
            'code':this.product.code,
            'designation':this.product.designation ,
            'quantity':this.product.quantity ,
            'supplier': this.product.supplier ,
            'price': this.product.price 
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