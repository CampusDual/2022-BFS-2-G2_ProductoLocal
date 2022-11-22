import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse } from '../model/rest/response';
import { Product } from '../model/product';
import { CreateProductRequest, EditProductRequest} from '../model/rest/request';
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
      'Content-type': 'application/json; charset=utf-8',
    });
    return this.http.post<Product>(url, body, { headers }).pipe(
      catchError(e =>{
        return throwError(()=>e);
      })
    );
  }

  public getProduct(id: number): Observable<Product> {
    const url = API_CONFIG.getProduct;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Product>(url, { params, headers });
  }

  public getProducts(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.getProducts;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { headers });
  }

  public getMyProducts(pageFilter: AnyPageFilter, login: string): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.getMyProducts;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('login', login);
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { params, headers });
  }

  public editProduct(product: Product): Observable<any> {
    const url = API_CONFIG.editProduct;
    const body: EditProductRequest = new EditProductRequest(product);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((e:HttpErrorResponse) =>{
        return throwError(()=>e);
      })
    );
  }

  public deleteProduct(id: number): Observable<any> {
    const url = API_CONFIG.deleteProduct;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<any>(url, { params, headers });
  }

  public findCities(pageFilter: AnyPageFilter, city: string): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.findCities;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('city', city);
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { params, headers });
  }

  public findCitiesProducer(pageFilter: AnyPageFilter, city: string, producer: string): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.findCitiesProducer;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    let params = new HttpParams().set('city', city);
    params = params.append("producer", producer);
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { params, headers });
  }


  public findTypes(pageFilter: AnyPageFilter, type: string): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.findTypes;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('typeProd', type);
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { params, headers });
  }

  public findTypesProducer(pageFilter: AnyPageFilter, type: string, producer: string): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.findTypesProducer;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    let params = new HttpParams().set('typeProd', type);
    params = params.append('producer', producer);
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { params, headers });
  }

  public findCityType(pageFilter: AnyPageFilter, city: string, type: string): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.findCityType;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    let params = new HttpParams().set('city', city);
    params = params.append('type', type);
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { params, headers });
  }

  public findCityTypeProducer(pageFilter: AnyPageFilter, city: string, type: string, producer: string): Observable<DataSourceRESTResponse<Product[]>> {
    const url = API_CONFIG.findCityTypeProducer;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    let params = new HttpParams().set('city', city);
    params = params.append('type', type);
    params = params.append('producer', producer);
    return this.http.post<DataSourceRESTResponse<Product[]>>(url, pageFilter, { params, headers });
  }

  public getData() : Observable<Array<Object>> {
    const url = API_CONFIG.findData;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.get<Array<Object>>(url, {headers});
  }

}
