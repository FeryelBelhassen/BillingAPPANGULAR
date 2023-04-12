import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../domain/product';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';
@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }


    public getProducts(): Observable<any>{
      console.log('heloooo')
      return this.http.get<Product[]>(`${API_URL}/products`);
    }

    
    public createProduct(product: Product): Observable<any> {
      return this.http.post(`${API_URL}/addproduct`, product);
    }
  
    public deleteProduct(id: number) {
      return this.http.delete(`${API_URL}/deleteproduct/${id}`);
    }
  
    
    public getProduct(id: number): Observable<any> {  
      return this.http.get(`${API_URL}/products/${id}`);  
    }  
  
    public updateProduct(id: any, product: Product): Observable<any> {
      return this.http.put(`${API_URL}/updateproduct/${id}`, product);
    }     
    
}