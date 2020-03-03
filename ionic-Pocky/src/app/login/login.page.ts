import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
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
  private username: string;
  private password: string;

  constructor(private databaseService: DatabaseService, private router: Router, private account: Account) {
  }
  
  ngOnInit() {
    this.account.databaseService = this.databaseService;
  }

  gotoPage(page) {
    this.router.navigate([page], {});
  }

  login() {
    this.account.setUsername(this.username);
    this.account.setPassword(this.password);
    this.account.login().then(
      () => {
        this.username = "";
        this.password = "";
      },
    ).then(
      () => this.gotoPage('home'),
      () => console.log("login failed!")
    )
  }

}
