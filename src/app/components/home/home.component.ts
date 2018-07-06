import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from '../../services/login.service';
// import {MatPaginator, MatTableDataSource} from '@angular/material';
// import {MatSortModule} from '@angular/material/sort';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Http, Headers, RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private id;
  private allUser: User[];
  private selectedUser: User;
  private isShowSearch: boolean = false;
  private validUser: boolean = false;
  private validPass: boolean = false;
  private valid: boolean = false;
  private searchuser: string = "";
  private cols: any[];
  // private MyFileUploadComponent : MyFileUploadComponent;
  private imageUrl: string ;
  private fileUpload: File;
  constructor(private loginService: LoginService, private router: Router,private http: Http) { 
    
  }

  ngOnInit() {
    this.selectedUser = { user: null, pass: null, id: null };
    this.fileUpload = null;
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'user', header: 'Username' },
      { field: 'pass', header: 'Password' },
    ];
    if(localStorage.getItem('token') != null)
      this.id = localStorage.getItem('token');
    else
      this.id = null;
    if (this.id == null) {
      this.router.navigate(['/Login']);
    }
    else{
      this.checkContact();
      this.showDetailAllUser();
      this.imageUrl = "http://localhost:8080/loadImage?id="+this.id;
    }
  }
  logOut() // ลบค่าผู้ใช้ในระบบเมื่อ Log Out
  {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/Login']);
  }
  updateUser(updateUser: User) // Update ข้อมูล User
  {
    this.checkContact();
    // console.log(updateUser.user);
    this.loginService.updateUser(updateUser).subscribe((response) => {
      console.log(response.code);
      if (response.code == "success")
        alert("Update Success");
      else if (response.code == "fail")
        alert("Update Fail");
      this.showDetailAllUser();
      this.clearContact();
    });
    return false;
  }
  deleteUser(deleteUser: User) // Delete ข้อมูล User
  {
    this.loginService.deleteUser(deleteUser).subscribe((response) => {
      console.log(response.code);
      if (response.code == "success")
        alert("Delete Success");
      else if (response.code == "fail")
        alert("Delete Fail");
      this.showDetailAllUser();
      this.clearContact();
    });

    return false;
  }
  addUser(addUser: User) // เพิ่มข้อมูล User
  {
    this.loginService.addUser(addUser).subscribe((response) => {
      console.log(response.code);
      if (response.code == "success")
        alert("Add Success");
      else if (response.code == "fail")
        alert("Add Fail");
      this.showDetailAllUser();
      this.clearContact();
    });

    return false;
  }
  showDetailAllUser() // ใช้เรียกข้อมูล User ทั้งหมด
  {
    this.loginService.DetailUser().subscribe((response) => {
      this.allUser = response.result;
    });
    return false;
  }

  searchUser(searchUser: string) { // ใช้ Search ข้อมูล User
    this.isShowSearch = true;
    // console.log(searchUser);
    this.loginService.SearchUser(searchUser).subscribe((response) => {
      console.log(response);
      this.allUser = response.result;
    });
    return false;
  }
  onSelect(user: User): void { // เมื่อกดเลือกจะได้ข้อมูล id,user,pass มาใส่ใน Text
    this.selectedUser = user;
    this.imageUrl = "http://localhost:8080/loadImage?id="+user.id;
    this.showDetailAllUser();
  }
  clearContact(): void { // ใช้เคลียค่าข้อมูลใน Text ของ id,user,pass
    this.selectedUser.id = null;
    this.selectedUser.user = null;
    this.selectedUser.pass = null;
  };
  checkContact() { // ใช้เคลียค่าข้อมูลใน Text ของ id,user,pass
    if (this.selectedUser.user != null)
      return true;
    else
      return false;
  }
  onFileChanged(file: FileList) {
    this.fileUpload = file.item(0);
    // console.log(file.item(0));
    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload);
  }
  onUpload() {
    this.loginService.onUpload(this.fileUpload,this.selectedUser.id).subscribe((response) => {
        this.fileUpload = null;
        this.showDetailAllUser();
        // this.imageUrl = "http://localhost:8080//loadImage?id="+this.id;
      });
  }
  
  loadImage() {
      
  }
}


// อัพโหลดรูป
// export class MyFileUploadComponent {
//   selectedFile: File;
//   private http:Http
//   onFileChanged(event) {
//     this.selectedFile = event.target.files[0]
//   }