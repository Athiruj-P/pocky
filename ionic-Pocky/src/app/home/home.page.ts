import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';

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
  private wallets = [];
  constructor(private alertController: AlertController, private databaseService: DatabaseService, private navCtrl: NavController, public actionSheetController: ActionSheetController, private account: Account, private modalController: ModalController, private router: Router) {
    this.username = this.account.getUsername();
    this.wallets = this.account.getWallet();
    this.username = account.getUsername();
    this.calculateTotal();
  }

  calculateTotal() {
    console.log("home page => in cal")
    console.log(this.wallets)
    this.totalBalance = 0;
    this.wallets.forEach(val => {
      this.totalBalance += val.getTotalBalance();
    });
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
      buttons: [ {
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
            this.account.databaseService.remove_wallet_by_id({ wal_id: this.wallets[index].getId() }).subscribe(res => {
              this.wallets.splice(index, 1);
              this.calculateTotal();
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
          placeholder: this.wallets[index].getWalletName()
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
            console.log(this.wallets[index]);
            this.account.databaseService.rename_wallet_by_id({ wal_id: this.wallets[index].getId(), wal_name: data.name }).subscribe(res => {
              this.wallets[index].setWalletName(data.name);
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
