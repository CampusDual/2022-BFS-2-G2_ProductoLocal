import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse } from '../model/rest/response';
import { Product } from '../model/product';
import { CreateProductRequest} from '../model/rest/request';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  public createProduct(product: Product): Observable<any> {
    const url = API_CONFIG.createProduct;
    const body: CreateProductRequest = new CreateProductRequest(product);
    const headers = new HttpHeaders({
      //'Content-type': 'application/json; charset=utf-8',
      'Content-type': 'charset=utf-8',
    });
    return this.http.post<Product>(url, body, { headers }).pipe(
      catchError(e =>{
        return throwError(()=>e);
      })
    );
  }

<<<<<<< Updated upstream

=======
  public getProducts(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.getProducts;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { headers });
  }
>>>>>>> Stashed changes

}
