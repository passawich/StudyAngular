import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  private id;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
      this.id = localStorage.getItem('token');
    else
      this.id = null;
    if (this.id == null) {
      this.router.navigate(['/Login']);
    }
  }

}
