import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { map } from 'rxjs/operators';

// import { AddQueueTypePage } from '../add-queue-type/add-queue-type.page';
import { ToastController } from '@ionic/angular';
import { Account, Income, PersonalWallet, Currency } from '../pattern.component';
@Component({
  selector: 'app-add-new-wallet',
  templateUrl: './add-new-wallet.page.html',
  styleUrls: ['./add-new-wallet.page.scss'],
})
export class AddNewWalletPage implements OnInit {
  private name: string;
  private currency: any;
  private money: any;
  public option_currency = [];

  constructor(public toastController: ToastController, private account: Account, private modalController: ModalController, private databaseService: DatabaseService) {
    databaseService.get_all_currency().subscribe(res => {
      res.forEach(val => {
        this.option_currency.push(val);
      });
    })
  }

  ngOnInit() {
  }

  selectedOption() {
    console.log(this.currency);
  }

  async showToast(mess, color) {
    const toast = await this.toastController.create({
      mode: "ios",
      message: mess,
      position: 'top',
      duration: 2000,
      color: color
    });
    toast.present();
  }

  addWallet() {
    console.log(`${this.name} - ${this.money} - ${this.account.getId()}`)
    if (this.money < 0) {
      this.showToast(`Balance must greater than 0 !!`, "danger");
    } else if (this.name && this.money > 0 && this.currency) {
      var json = {
        "wal_name": this.name,
        "wal_money": this.money,
        "wal_ac_id": this.account.getId(),
        "wal_cur_id": this.currency
      }
      this.databaseService.add_wallet(json).subscribe(res_wallet => {
        var tmpWal = new PersonalWallet;
        var tmpCurrency = new Currency;
        var tmpTran = new Income;
        var json = {
          "tran_name": "Initial balance",
          "tran_amount": this.money,
          "tran_wal_id": res_wallet.insertId,
          "tran_status": "Y",
          "tran_type": 1
        }
        tmpCurrency.setName(this.option_currency[this.currency - 1].cur_name);
        tmpCurrency.setNameAbb(this.option_currency[this.currency - 1].cur_name_abb);
        tmpWal.setId(res_wallet.insertId);
        tmpWal.setWalletName(this.name);
        tmpWal.setCurrency(tmpCurrency);
        tmpWal.setTotalBalance(this.money);
        this.account.setWallet(tmpWal);

        tmpTran.setAmount(this.money);
        tmpTran.setDescription("Initial balance");

        this.account.databaseService.add_transaction(json).subscribe((res) => {
          tmpTran.setTransactionId(res[0].tran_id);
          tmpTran.setDateTime(res[0].tran_date);
          tmpWal.addTransaction(tmpTran);
          this.showToast(`Added a new wallet as "${this.name}"`, "success");
          this.closeModal();
        });

        console.log(this.account.getWallet());
        this.closeModal();
      })
    } else {
      this.showToast(`Please fill in all informations!!`, "danger");
    }

  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
