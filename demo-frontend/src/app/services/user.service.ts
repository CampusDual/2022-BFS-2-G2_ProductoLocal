import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse } from '../model/rest/response';
import { User } from '../model/user';
import { CreateUserRequest, EditUserRequest} from '../model/rest/request';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(user: User): Observable<any> {
    const url = API_CONFIG.createUser;
    const body: CreateUserRequest = new CreateUserRequest(user);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
    });
    return this.http.post<User>(url, body, { headers }).pipe(
      catchError(e =>{
        return throwError(()=>e);
      })
    );
  }

  public getProducers(): Observable<any> {
    const url = API_CONFIG.getProducers;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
    });
    return this.http.get<User>(url, { headers }).pipe(
      catchError(e =>{
        return throwError(()=>e);
      })
    );
}

  public getUser(login: string): Observable<User> {
    const url = API_CONFIG.getUser;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('login', login);
    return this.http.get<User>(url, { params, headers });
  }

  public deleteUser(login: string): Observable<any> {
    const url = API_CONFIG.deleteUser;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('login', login.toString());
    return this.http.delete<any>(url, { params,headers });
  }

  public editUser(user: User): Observable<any> {
    const url = API_CONFIG.editUser;
    const body: EditUserRequest = new EditUserRequest(user);
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

  public showProducers(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<User[]>> {
    const url = API_CONFIG.showProducers;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<DataSourceRESTResponse<User[]>>(url, pageFilter, { headers }).pipe(
      catchError((e:HttpErrorResponse) =>{
        return throwError(()=>e);
      })
    );
  }
}
