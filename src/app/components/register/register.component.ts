import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user:User;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {
    this.user = { user:null, pass:null, id:null};
  }
  addUser(addUser: User) // เพิ่มผู้ใช้ในระบบ
  {
     this.loginService.addUser(addUser).subscribe((response) => { 
       console.log(response.code);
       if(response.code == "success")
       {
          alert("Register Success");
          this.Back();
       }
       else if(response.code == "fail")
       {
          alert("Register Fail");
          this.clearContact();
       }
     });
    
    return false;
  }
  Back(){ // ย้อนกลับไปหน้า Login
    this.router.navigate(['/Login']);
  }
  clearContact() { // ใช้เคลียค่าใน text user,pass
    this.user.user = null;
    this.user.pass = null;
  };
}
