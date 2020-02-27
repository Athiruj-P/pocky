import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Import classes from pattern.component.ts
 * เข้าถึงคลาสต่าง ๆ ที่ต้องใช้ โดยกำหนดชื่อของคลาสที่ต้องการ
 * Author: Athiruj Poositaporn
 * Create date: 27/02/2020
 */
import { Account } from '../pattern.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private uername:string;
  private password:string;
  constructor(private router: Router,private Account: Router) { }

  ngOnInit() {
  }

  gotoPage(page) {
    this.router.navigate([page], {});
  }
}
