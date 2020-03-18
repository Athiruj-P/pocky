import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Account } from '../pattern.component';
import { Income, Expenditure } from '../pattern.component';
import { ToastController } from '@ionic/angular';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.page.html',
  styleUrls: ['./edit-transaction.page.scss'],
})
export class EditTransactionPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(this.walletIndex)
    console.log(this.tran_id)
    console.log(this.account.databaseService.get_transaction_by_tran_id({ "tran_id": this.tran_id }).subscribe())
    this.account.databaseService.get_transaction_by_tran_id({ "tran_id": this.tran_id }).subscribe(res_tran => {
      res_tran.forEach(val_tran => {
        this.targetTransaction = val_tran.tran_type == 1 ? new Income : new Expenditure;
        console.log(`pattern => ID => ${val_tran.tran_id}`)
        this.targetTransaction.setTransactionId(val_tran.tran_id);
        this.targetTransaction.setDescription(val_tran.tran_name);
        this.targetTransaction.setAmount(val_tran.tran_amount);
        this.targetTransaction.setDateTime(val_tran.tran_date);

        this.segment = this.targetTransaction instanceof Income ? "Income" : "Expenses";
        this.note = this.targetTransaction.getDescription();
        this.balance = this.targetTransaction instanceof Income ? this.targetTransaction.getAmount() : -1 * this.targetTransaction.getAmount();
      })
    })
  }

  editTransaction() {
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
      tmp_tran.setAmount(this.targetTransaction instanceof Income ? this.targetTransaction.getAmount() : -1 * this.targetTransaction.getAmount());
      tmp_tran.setTransactionId(this.targetTransaction.getTransactionId());
      var json = {
        "tran_name": tmp_tran.getDescription(),
        "tran_amount": this.balance,
        "tran_id": tmp_tran.getTransactionId(),
        "tran_type": type
      }
      console.log(json);
      this.account.databaseService.edit_transaction(json).subscribe((res) => { })
      this.showToast("Updated a transaction", "warning");
      this.closeModal();
    } else {
      this.showToast(`Please fill in all informations!!`, "danger");
    }
  }
}
