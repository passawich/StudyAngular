import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpRequest,HttpErrorResponse} from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(public jwtHelper: JwtHelperService,private http: Http) { }
    
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
      }


    doLogin(value) {
        let headers = new Headers([{ 'Content-Type': 'application/json','Accept':'application/json' }]);
          let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/connect', value, options ).pipe(
          map((response) => {

            return response.json();
          })
        );
      }

    // doLogin(value) {
    //     let headers = new Headers([{ 'Content-Type': 'application/json','Accept':'application/json' }]);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post('http://localhost:8080/connect',value, options).pipe(
    //         .map(res => {
    //             // login successful if there's a jwt token in the response
    //             if (res && res.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(res));
    //             }
    //             return res;
    //         }));
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}