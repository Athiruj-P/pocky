import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';
import { ToastController } from '@ionic/angular';

/**
 * Import classes from pattern.component.ts
 * เข้าถึงคลาสต่าง ๆ ที่ต้องใช้ โดยกำหนดชื่อของคลาสที่ต้องการ
 * Author: Athiruj Poositaporn
 * Create date: 28/02/2020
 */
import { Account } from '../pattern.component';
import { AddNewWalletPage } from '../add-new-wallet/add-new-wallet.page';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private username: string;
  private totalBalance = 0;
  private all_wallets = [];
  private arr_sum_balance = 0;
  private arr_cur = [];
  constructor(public toastController: ToastController, private alertController: AlertController, private databaseService: DatabaseService, private navCtrl: NavController, public actionSheetController: ActionSheetController, private account: Account, private modalController: ModalController, private router: Router) {
    this.username = this.account.getUsername();
    this.all_wallets = this.account.getWallet();
    this.username = account.getUsername();
    this.calculateTotal();
    this.totalbalance_by_cur();
  }

  totalbalance_by_cur() {
    this.arr_sum_balance = 0;
    this.arr_cur = [];
    var tmp_cur: any;
    this.account.getWallet().forEach((val, index) => {
      if (index == 0) {
        tmp_cur = val.getCurrency().getNameAbb();
        this.arr_sum_balance += val.getTotalBalance();
      } else if (tmp_cur == val.getCurrency().getNameAbb()) {
        this.arr_sum_balance += val.getTotalBalance();
      } else {
        this.arr_cur.push({
          "currency": tmp_cur,
          "arr_sum_balance": this.arr_sum_balance
        })
        this.arr_sum_balance = 0;

        tmp_cur = val.getCurrency().getNameAbb();
        this.arr_sum_balance += val.getTotalBalance();
      }

      if (this.account.getWallet().length - 1 == index) {
        this.arr_cur.push({
          "currency": tmp_cur,
          "arr_sum_balance": this.arr_sum_balance
        })
      }

    })
    console.log(this.arr_cur)
  }

  calculateTotal() {
    console.log("home page => in cal")
    console.log(this.all_wallets)
    this.totalBalance = 0;
    this.all_wallets.forEach(val => {
      this.totalBalance += val.getTotalBalance();
    });
    this.totalbalance_by_cur();
  }

  ngOnInit(): void {
    // this.calculateTotal();
  }

  ionViewWillEnter() {
    this.calculateTotal();
  }

  async cardAction(index) {
    /**
     * {
        text: 'Add transaction',
        handler: () => {
          console.log('Add transaction');
          this.modal_addTransaction(index)
        }
      },
     */
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Edit name',
        handler: () => {
          console.log('Edit name');
          this.presentPrompt(index)
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.presentAlert(index);
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
    this.account.clearAccount();
    this.navCtrl.navigateBack('/login');
  }

  async showModel() {
    const modal = await this.modalController.create({
      component: AddNewWalletPage
    });

    modal.onDidDismiss().then(() => {
      this.calculateTotal();
    });

    return await modal.present();
  }

  async showToast(mess, color) {
    const toast = await this.toastController.create({
      mode: "ios",
      message: mess,
      position: 'top',
      duration: 1000,
      color: color
    });
    toast.present();
  }

  async presentAlert(index) {
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
            console.log('Delete');
            this.account.databaseService.remove_wallet_by_id({ wal_id: this.all_wallets[index].getId() }).subscribe(res => {
              this.all_wallets.splice(index, 1);
              this.calculateTotal();
              this.showToast("Deleted a wallet ","danger");
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async presentPrompt(index) {
    let alert = await this.alertController.create({
      header: 'Edit',
      message: 'Edit Name',
      inputs: [
        {
          name: 'name',
          placeholder: this.all_wallets[index].getWalletName()
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
            console.log(data.name);
            console.log(this.all_wallets[index]);
            this.account.databaseService.rename_wallet_by_id({ wal_id: this.all_wallets[index].getId(), wal_name: data.name }).subscribe(res => {
              this.all_wallets[index].setWalletName(data.name);
              this.showToast("Updateed a wallet's name ","warning");
            });
          }
        }
      ]
    });
    alert.present();
  }

  gotoPage(page, index) {
    this.router.navigate([page], {
      queryParams: { index: index }
    });
  }

  async modal_addTransaction(index) {
    const modal = await this.modalController.create({
      component: AddTransactionPage,
      componentProps: {
        index: index
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
    }).then(() => {
      return Promise.resolve(
        this.calculateTotal()
      );
    })

    return await modal.present();
  }

}
