import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

/**
 * Import classes from pattern.component.ts
 * เข้าถึงคลาสต่าง ๆ ที่ต้องใช้ โดยกำหนดชื่อของคลาสที่ต้องการ
 * Author: Athiruj Poositaporn
 * Create date: 28/02/2020
 */
import { Account } from '../pattern.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private username: string;
  private totalBalance: any;
  private wallets = [];
  constructor(private navCtrl: NavController, public actionSheetController: ActionSheetController, private account: Account,public alertController: AlertController,public modalController: ModalController,private alertCtrl: AlertController) {
    this.username = this.account.getUsername();
    this.wallets.push(
      { name: "wallet1", balance: 500, currency: "THB" },
      { name: "wallet2", balance: 350, currency: "THB" },
      { name: "wallet3", balance: 100, currency: "THB" },
      { name: "wallet4", balance: 20, currency: "THB" }
    );

    this.getTotalBalance();
  }

  getTotalBalance() {
    this.totalBalance = 0;
    this.wallets.forEach(val => {
      this.totalBalance += val.balance;
    });
  }

  async cardAction(index) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Add transaction',
        handler: () => {
          console.log('Add transaction');
        }
      }, {
        text: 'Edit name',
        handler: () => {
          console.log('Edit name');
          this.presentPrompt();
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete');
          this.presentAlert();
          this.wallets.splice(index, 1);
          this.getTotalBalance();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel');
        }
      }]
    });
    await actionSheet.present();
  }

  backPage() {
    this.navCtrl.navigateBack('/login');
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Confirm Delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          role: 'confirm',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: 'Edit',
      message: 'Edit Name',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
  }



}
