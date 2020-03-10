import { Component, OnInit } from '@angular/core';
import { PickerOptions, OverlayEventDetail } from '@ionic/core';
import { AlertController, NavController, ModalController, PickerController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';
import { EditTransactionPage } from '../edit-transaction/edit-transaction.page';
import { DatabaseService } from 'src/app/services/database.service';
/**
 * Import classes from pattern.component.ts
 * เข้าถึงคลาสต่าง ๆ ที่ต้องใช้ โดยกำหนดชื่อของคลาสที่ต้องการ
 * Author: Athiruj Poositaporn
 * Create date: 07/03/2020
 */
import { Account } from '../pattern.component';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.page.html',
  styleUrls: ['./wallet-detail.page.scss'],
})
export class WalletDetailPage implements OnInit {
  private walletName: string;

  private currentWalletIndex: any;
  private sDefaultEmail: string;
  private selected = [''];
  private Year = 'Year';
  private Month = 'Month';
  private Current = '300.00';
  private Income = '500.00';
  private Expense = '200.00';
  private Balance = '300.00';

  private totalBalance: any;
  public segment = "transactions";
  private tran_date = [];
  private tran_detail = [];
  constructor(private alertController: AlertController, private navCtrl: NavController, private databaseService: DatabaseService, private account: Account, private pickerCtrl: PickerController, public modalController: ModalController, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.currentWalletIndex = res.index;
      this.walletName = this.account.getWallet()[res.index].getWalletName();
      this.calculateTotal();
      this.load_transaction();
      // this.load_transaction();
      console.log(this.account.getWallet()[res.index]);
    });
  }

  //for calculate
  calculateTotal() {
    console.log("In calculateTotal")
    this.totalBalance = 0;
    this.account.getWallet()[this.currentWalletIndex].updateTotalBalance().then(
      (balance) => {
        this.totalBalance = balance;
      }
    ).then(
      () => {
        var json = {
          wal_id: this.account.getWallet()[this.currentWalletIndex].getId(),
          wal_money: this.totalBalance
        };
        this.account.databaseService.update_wallet_balance(json).subscribe(res => {
          // console.log(res)
        });
      }
    );
  }

  
  ngOnInit() {
  }

}
