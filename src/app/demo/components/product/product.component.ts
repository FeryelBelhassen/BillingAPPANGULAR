import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/domain/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

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

    idToget:number=NaN;
    
    id!: number;
        
    MODE: string = 'CREATE';

    constructor(private productService: ProductService, private messageService: MessageService,
        public authService: AuthService, private userService: UserService, private router: Router) { 
            this.id = this.authService.getAuthedUserID()
        }

    ngOnInit() {
        ///this.productService.getProducts().then(data => this.products = data);
        this.getProducts(this.id);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'designation', header: 'Designation' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'supplier', header: 'Supplier' },
            { field: 'price', header: 'Price' }
           
        ];

    }

    getProducts(id: number){
        this.idToget= id;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{
               
               if (data.roles[0].name ==='ADMIN'){
                    if (data.roles[0].name === 'ADMIN'){
                        this.productService.getProducts()
                            .subscribe((data)=>{
                            this.products=data;  
                            console.log("Array -> "+this.products)
                })
            }        
              
                } else{
                  //cas non
                  this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                  this.router.navigate(['/home'])
                }
           
          })
        }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }


    editProduct(id:number, data: Product) {
        this.product=data;
        this.productDialog = true; 
        this.idToUpdate = id;
        this.MODE = 'APPEND'      
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

   

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
   
    saveProduct() {
        if (this.MODE === 'CREATE'){
            const toAdd: Product = {
                'code':this.product.code,
                'designation':this.product.designation ,
                'quantity':this.product.quantity ,
                'supplier': this.product.supplier ,
                'price': this.product.price 
                };
            this.productService.createProduct(toAdd).subscribe( data =>{
                console.log(data);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                this.productDialog = false;
                this.ngOnInit();   
                }, error => {
                    console.log(error);
                    this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                    this.productDialog = false;
                    } );
                
    
    
        } else if( this.MODE === 'APPEND') {
            const toEdit: Product=  {
                'code':this.product.code,
                'designation':this.product.designation ,
                'quantity':this.product.quantity ,
                'supplier': this.product.supplier ,
                'price': this.product.price 
              }
            
            this.productService.updateProduct(this.idToUpdate, toEdit).subscribe( (data) =>{
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                this.productDialog = false;
                this.ngOnInit();   
              }, error => {
                console.log(error);
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });
                this.productDialog = false;
                } );
        }
    
    }

    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}