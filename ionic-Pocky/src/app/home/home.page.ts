import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private username: any;
  private totalBalance: any;
  private wallets = []
  constructor(private navCtrl: NavController, public actionSheetController: ActionSheetController) {
    this.username = "60160116";
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
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          console.log('Delete');
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
}
