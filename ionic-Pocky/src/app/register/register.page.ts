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
      var json = {
        "username": this.username,
        "password": this.password,
      };
      this.databaseService.register_validation(json).subscribe(res => {
        if (Object.keys(res).length > 0) {
          console.log("username had been taken");
        } else {
          this.account.setUsername(this.username);
          this.account.setPassword(this.password);
          this.account.register().subscribe(res => {
            if (Object.keys(res).length > 0) {
              this.gotoPage('home');
            } else {
              console.log("login failed");
            }
          });
        }
      });
      // this.databaseService.login_varification(json).subscribe(res => {
      //     // check = Object.keys(res).length > 0 ? true : false;
      //     console.log(`res => ${res}`);
      // });

    } else {
      console.log("Password are not match!!");
    }

  }

}
