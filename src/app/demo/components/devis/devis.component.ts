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
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './devis.component.html',
    styleUrls: ['./devis.component.css'],
    providers: [MessageService]
})
export class DevisComponent implements OnInit {

    Dialogdevis: boolean = false;

    productDialog: boolean =false;

    deleteDevisDialog: boolean = false;

    deleteDevissDialog: boolean = false;

    afficheDevisDialog: boolean = false;

    deviss: Devis[] = [];

    devis!: Devis ;

    product!: Product;

    devi:Array<Devis> = [];

    selectedDevis: Devis[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    products: Product[] = [];

    MODE: string = 'CREATE';

    idToUpdate:number=NaN;

    idToDel:number=NaN;

    idToget:number=NaN;

    iddevis:number=NaN;

    selectedProduct: any;

    selectedProducts = []

    id!: number;
    
    total: number = 0;

    iduser:number;
    
    price: number = 0;
    


    constructor(private devisService: DevisService, private messageService: MessageService,
         private productService: ProductService , private fb:FormBuilder,
        private http: HttpClient, private authService: AuthService, private userService: UserService,
        private router: Router) {
            this.iduser = this.authService.getAuthedUserID()
        }



    ngOnInit() {

        this.getDevis(this.iduser);


        this.cols = [
            { field: 'numerodevis', header: 'NumeroDevis' },
            { field: 'product', header: 'Product' },
            { field: 'datedevis', header: 'DateDevis' },
            { field: 'price', header: 'price'  }
            
        ];

        this.productService.getProducts().subscribe(data => {
            this.products = data;

        });

    }



    getDevis(iduser: number){
        this.idToget= iduser;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{
               if (data.roles[0].name ==='ADMIN' || data.roles[0].name ==='MAGASINIER' || data.roles[0].name ==='CLIENT'){
                  this.devisService.getAllDevis()
                     .subscribe((data)=>{
                        this.deviss=data;
                        console.log("Array -> "+this.deviss)})
                } 
                else{
                  //cas non
                  this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                  this.router.navigate(['/auth/error'])
                }

          })
        }

    openNew(iduser: number) {
        this.idToget= iduser;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{

               if (data.roles[0].name ==='ADMIN'  || data.roles[0].name ==='MAGASINIER' ){

                this.devis= new Devis('',[],new Date,0);
                this.submitted = false;
                this.MODE = 'CREATE';
                this.Dialogdevis = true;
               }
               else{
                //cas non
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                this.router.navigate(['/auth/error'])
              }
            })

     }


    ajouterProduct(){
        this.product={code: 0, designation: "", price: 0, quantity: 0, supplier: ""};
        this.submitted = false;
        this.MODE = 'CREATE';
        this.productDialog = true;
    }

    print(){
        window.print()
      }


    editDevis(id:number, devis:Devis, iduser:number) {
        this.idToget= iduser;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{

               if (data.roles[0].name ==='ADMIN'  || data.roles[0].name ==='MAGASINIER' ){

                this.devis=devis;
                this.Dialogdevis = true;
                this.idToUpdate = id;
                this.MODE = 'APPEND'
               }
               else{
                //cas non
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                this.router.navigate(['/auth/error'])
              }
            })


     }

    deleteDevis(id: number, iduser: number) {
        this.idToget= iduser;
        this.userService.getUserById(this.idToget)
            .subscribe((data)=>{

               if (data.roles[0].name ==='ADMIN'  || data.roles[0].name ==='MAGASINIER' ){

                this.deleteDevisDialog = true;
                this.devis = { ...this.devis }
                this.idToDel  = id
               }
               else{
                //cas non
                this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Error 404 ', life: 6000 });
                this.router.navigate(['/auth/error'])
              }
            })

    }

    confirmDelete() {
        this.deleteDevisDialog = false;
        this.deviss = this.deviss.filter(val => val.id !== this.devis.id);

         this.devisService.deleteDevis(this.idToDel).subscribe((data) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devis Deleted ', life: 3000 });
            this.ngOnInit();
        }, error => {
          console.log(error);
          this.messageService.add({severity: 'error',summary: 'Erreur',detail: ' Une erreure s\'est produite! ', life: 3000 });

        });
    }


    hideDialog() {
        this.Dialogdevis = false;
        this.submitted = false;
    }


    hideDialogProduct() {
        this.productDialog = false;
        this.submitted = false;
    }

    afficherDevis(id: number) {
       this.afficheDevisDialog = true;
        this.devis = { ...this.devis }
        this.iddevis  = id
    }
   

    calculateTotal(quantity: number, price: number): number {
        if (typeof quantity === 'number' && typeof price === 'number') {
          return quantity * price;
        } else {
          return 0;
        }
      }


      saveDevis() {
        let totalPrice = 0;
      
        if (this.devis.product) {
          this.devis.product.forEach((product: Product) => {
            totalPrice += product.price;
          });
        }
      
        if (this.MODE === 'CREATE') {
          const toAdd: Devis = {
            'numerodevis': this.devis.numerodevis,
            'product': this.devis.product as Product[],
            'datedevis': this.devis.datedevis,
            'price': this.devis.price
          };
      
          this.devisService.createDevis(toAdd).subscribe(data => {
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Created', life: 3000 });
            this.Dialogdevis = false;
            this.ngOnInit();
          }, error => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite!', life: 3000 });
            this.Dialogdevis = false;
          });
      
        } else if (this.MODE === 'APPEND') {
          const toEdit: Devis = {
            numerodevis: this.devis.numerodevis,
            product: this.devis.product as Product[],
            datedevis: this.devis.datedevis,
            price: this.devis.price
          };
      
          this.devisService.updateDevis(this.idToUpdate, toEdit).subscribe(data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Invoice Updated', life: 3000 });
            this.Dialogdevis = false;
            this.ngOnInit();
          }, error => {
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite!', life: 3000 });
            this.Dialogdevis = false;
          });
        }
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

    } 
}

   
    getPrice(): number {
        if (this.product && typeof this.product.price === 'number') {
          console.log('Prix du produit:', this.product.price);
          return this.product.price;
        } else {
          console.log('Erreur: Prix du produit indisponible');
          return 0;
        }
      }
      
      


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

   /* getTotal(devis: Devis): number {
      var total = 0
      devis.product.forEach((item)=> {
        total += item?.price * item?.quantity
      })
      return total

  }*/
}
