import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../domain/product';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('http://localhost:8081/api/product')
        //return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
            
    }
    
      public updateProduct(product: Product) {
            return this.http.put<Product>("http://localhost:8081/api/product" + "/"+ product.designation,product);
            }  
      
      public deleteProduct(product: { designation: string; }) {
              return this.http.delete<Product>("http://localhost:8081/api/product" + "/"+ product.designation);
            }
      public createProduct(product: {designation: string}) {
              return this.http.post<Product>("http://localhost:8081/api/product", product);
            }
    
}