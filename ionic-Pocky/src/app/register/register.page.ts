import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';

/**
 * Import classes from pattern.component.ts
 * เข้าถึงคลาสต่าง ๆ ที่ต้องใช้ โดยกำหนดชื่อของคลาสที่ต้องการ
 * Author: Athiruj Poositaporn
 * Create date: 28/02/2020
 */
import { Account } from '../pattern.component';
import { compileFactoryFunction } from '@angular/compiler/src/render3/r3_factory';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private username: string;
  private password: string;
  private confirm_password: string;

  constructor(private navCtrl: NavController, private router: Router, private account: Account, private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  gotoPage(page) {
    this.router.navigate([page], {});
  }

  backPage() {
    this.navCtrl.back();
  }


  register() {
    if (this.password == this.confirm_password) {
      this.account.setUsername(this.username);
      this.account.setPassword(this.password);
      this.account.register().then(
        () => {
          this.username = "";
          this.password = "";
          this.gotoPage('home')
        },
        () => console.log("username had been taken")
      )
    } else {
      console.log("Password are not match!!");
    }

  }

}
