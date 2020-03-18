import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from '../pattern.component';
import { Income, Expenditure } from '../pattern.component';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {
  index;
  public segment = "Expenses";
  private balance = 0.00;
  private note = "";

  constructor(public modalController: ModalController, private account: Account) { }

  ngOnInit() {
  }

  addTransaction() {
    if (this.balance <= 0) {
      this.showToast(`Balance must greater than 0 !!`, "danger");
    } else if (this.note && this.balance) {
      if (this.segment == "Income") {
        var type = 1;
        var tmp_tran = new Income;
      } else {
        var type = 2;
        var tmp_tran = new Expenditure;
      }
      tmp_tran.setDescription(this.note);
      tmp_tran.setAmount(this.balance);
      var json = {
        "tran_name": this.note,
        "tran_amount": this.balance,
        "tran_wal_id": this.account.getWallet()[this.index].getId(),
        "tran_status": "Y",
        "tran_type": type
      }
      console.log(json);
      this.account.databaseService.add_transaction(json).subscribe((res) => {
        tmp_tran.setTransactionId(res[0].tran_id);
        tmp_tran.setDateTime(res[0].tran_date);
        this.account.getWallet()[this.index].addTransaction(tmp_tran);
        console.log(this.account.getWallet()[this.index]);
      this.showToast("Added a new transaction", "warning");
      this.closeModal();
      });
    } else {
      this.showToast(`Please fill in all informations!!`, "danger");
    }
  }
  async closeModal() {
    await this.modalController.dismiss(this.index);
  }
}
