import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Product, Products } from './products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService{

  baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  GetProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.baseUrl + '/products');
  }
  
  CreateProduct(data: any): Observable<Products> {
    return this.http
      .post<Products>(
        this.baseUrl + '/products',
        JSON.stringify(data),
        this.httpOptions
      )
  }

  GetProductById(id: string): any {
    return this.http.get(this.baseUrl + '/products/' + id)
  }

  UpdateProduct(id: string, data: any): Observable<Product> {
    return this.http
      .put<Product>(
        this.baseUrl + '/products/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
  }

  DeleteProduct(id: string) {
    return this.http.delete(this.baseUrl + '/products/' + id)
  }
  
}
