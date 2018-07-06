import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Response } from '@angular/http/src/static_response';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user:User;
  private code:string;
  private chkuser:boolean=true;
  private chkpass:boolean=true;
  private chk:boolean=false;
  constructor(private loginService:LoginService,private router:Router) { 
    }

  ngOnInit() {
    this.user = { user:null, pass:null, id:null};
  }
  onSubmit(user:string,pass:string) 
  { 
    this.user.user = user;
    this.user.pass = pass;
    this.login(this.user);
  }
  login(userLog:User) // ใช้ Login
  {
    //console.log(userLog);
      this.loginService.doLogin(userLog).subscribe(
        response => {
        this.user = response.result;
        this.code = response.code;
        console.log(response);
        if(this.code == "success")
        {
          localStorage.setItem('token', response.result.id);
          this.router.navigate(['/Home']);
        }
        else if(this.code == "fail")
        {
          alert("loginFail Not Found");
          // this.clearContact();
          this.router.navigate(['/Login']);
        }
      }
    );
    return false;
  }
  register(){ // ย้ายหน้าไปหน้า register
    this.router.navigate(['/Register']);
  }
  clearContact() { // ใช้เคลียค่าใน text user,pass
    this.user.user = null;
    this.user.pass = null;
  };
  // checkContact(userLog:User) { // ใช้เคลียค่าข้อมูลใน Text ของ id,user,pass
  //   if(userLog.user != null)
  //     this.chkuser = true;
  //   else if(userLog.user == null)
  //     this.chkuser = false;
  //   if(userLog.pass != null)
  //     this.chkpass = true;
  //   else if(userLog.pass == null)
  //     this.chkpass = false;
  //   if(this.chkuser && this.chkpass)
  //     return true;
  //   else
  //     return false;
  // }
}
