import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse } from '../model/rest/response';
import { User } from '../model/user';
import { CreateUserRequest} from '../model/rest/request';
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
}