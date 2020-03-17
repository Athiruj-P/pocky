import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';

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

  constructor(public toastController: ToastController, private navCtrl: NavController, private router: Router, private account: Account, private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  gotoPage(page) {
    this.router.navigate([page], {});
  }

  backPage() {
    this.navCtrl.back();
  }

  async showToast(mess, color) {
    const toast = await this.toastController.create({
      mode: "ios",
      message: mess,
      position: 'top',
      duration: 1500,
      color: color
    });
    toast.present();
  }

  register() {
    if (!this.username || !this.password || !this.confirm_password) {
      this.showToast("Username and password are required!!","danger");
    } else if (this.password == this.confirm_password) {
      this.account.setUsername(this.username);
      this.account.setPassword(this.password);
      this.account.register().then(
        () => {
          this.username = "";
          this.password = "";
          this.gotoPage('home');
          this.showToast("Hello newbie :)","success")
        },
        () => this.showToast("Username had been taken!!","danger")
      )
    } else {
      this.showToast("Password are not match!!","danger")
    }

  }

}
