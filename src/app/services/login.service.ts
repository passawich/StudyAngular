import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isUserLoginIn ;
  constructor(private http:Http,private router : Router) { }
  doLogin(value) {
    let headers = new Headers([{ 'Content-Type': 'application/json','Accept':'application/json' }]);
      let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/login', value, options ).pipe(
      map((response) => {
        this.isUserLoginIn = false;
        if(response.json().code = "200")
          this.isUserLoginIn = true;
        return response.json();
      })
    );
  }
  // doLogout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  //   this.router.navigate(['/Login']);
  // }
  updateUser(value) {
    let headers = new Headers([{ 'Content-Type': 'application/json','Accept':'application/json' }]);
      let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/update', value, options ).pipe(
      map((response) => {
        // console.log(response);
        return response.json();
      })
    );
  }
  deleteUser(value) {
    // console.log(value);
    let headers = new Headers([{ 'Content-Type': 'application/json' }]);
      let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/delete', value, options ).pipe(
      map((response) => {
        return response.json();
      })
    );
  }
  addUser(value) {
    let headers = new Headers([{ 'Content-Type': 'application/json' }]);
      let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/insert', value, options ).pipe(
      map((response) => {
        // return response.text();
        return response.json();
      })
    );
  }
  DetailUser() {
    return this.http.get('http://localhost:8080/detailuser').pipe(map((res) => res.json()));
  }
  SearchUser(value) {
    return this.http.get('http://localhost:8080/searchuser?username=' + value ).pipe(
      map((response) => {
        console.log(response);
        return response.json();
      })
    );
  }

  onUpload(Image,id) {
    let headers = new Headers([{ 'Content-Type': 'multipart/form-data' }]);
      let options = new RequestOptions({ headers: headers });
    const uploadData = new FormData();
    uploadData.append('myFile', Image, Image.name);
    return this.http.post('http://localhost:8080/uploadimage?id=' + id, uploadData ,options ).pipe(
      map((response) => {
        console.log(response);
        return response.toString();
      })
    );
  }


}
