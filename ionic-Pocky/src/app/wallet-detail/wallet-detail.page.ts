import { Component, OnInit } from '@angular/core';
import { PickerOptions, OverlayEventDetail } from '@ionic/core';
import { AlertController, NavController, ModalController, PickerController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';
// import { EditTransactionPage } from '../edit-transaction/edit-transaction.page';
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
  private selected = [''];
  private Year = 'Year';
  private Month = 'Month';
  private Currency = "";
  private Income = 0;
  private Expense = 0;
  private totalBalance: any;
  public segment = "transactions";
  private tran_date = [];
  private tran_detail = [];
  arr_option = [];
  arr_month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  constructor(public toastController: ToastController, private alertController: AlertController, private navCtrl: NavController, private databaseService: DatabaseService, private account: Account, private pickerCtrl: PickerController, public modalController: ModalController, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.currentWalletIndex = res.index;
      this.walletName = this.account.getWallet()[res.index].getWalletName();
      this.Currency = this.account.getWallet()[res.index].getCurrency().getNameAbb();
      this.calculateTotal();
      this.load_transaction();
      // this.load_transaction();
      console.log(this.account.getWallet()[res.index])
      databaseService.get_year({ "wal_id": this.account.getWallet()[res.index].getId() }).subscribe(res => {
        res.forEach(val => {
          this.arr_option.push({ text: val.Year, value: val.Year });
        });
      })

    })
  }

  ionViewWillEnter() {
    this.loadChert();
  }

  calculate_pie_area() {
    this.pie_income = Math.round((this.Income / (this.Income + this.Expense)) * 100);
    this.pie_expense = Math.round((this.Expense / (this.Income + this.Expense)) * 100);
    console.log(`Income => ${this.Income / (this.Income + this.Expense)} | Exp => ${(this.Expense / (this.Income + this.Expense)) * 100}`);
  }

  loadChert() {
    this.calculate_pie_area();
    var speed = 250
    this.gaugeChart = new Chart(this.gaugeArea.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          label: '# of Tomatoes',
          data: [this.Income, this.Expense],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        //cutoutPercentage: 40,
        responsive: true,
        legend: {
          display: true,
          position: "top",
          labels: {
            fontColor: "#333",
            fontSize: 12
          }
        }

      }
    });

  }

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
        }
        this.account.databaseService.update_wallet_balance(json).subscribe(res => {
        });
      }
    )
  }

  dateHelper(date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    return `${date.substr(8, 2)} ${month[parseInt(date.substr(5, 2)) - 1]} ${date.substr(0, 4)}`
  }
  
  format_transaction() {
    this.tran_date = [];
    this.tran_detail = [];
    var tmp_date: any;
    var tmp_tran = this.account.getWallet()[this.currentWalletIndex].transaction;
    tmp_tran.forEach((val, index) => {
      if (index == 0) {
        tmp_date = val.getDateTime().substr(0, 10);
        this.tran_detail.push({
          "tran_id": val.getTransactionId(),
          "tran_des": val.getDescription(),
          "tran_amount": val.getAmount()
        })
      } else if (tmp_date == val.getDateTime().substr(0, 10)) {
        this.tran_detail.push({
          "tran_id": val.getTransactionId(),
          "tran_des": val.getDescription(),
          "tran_amount": val.getAmount()
        })
      } else {
        this.tran_date.push({
          "date": this.dateHelper(tmp_date),
          "tran_detail": this.tran_detail
        })
        this.tran_detail = [];

        tmp_date = val.getDateTime().substr(0, 10);
        this.tran_detail.push({
          "tran_id": val.getTransactionId(),
          "tran_des": val.getDescription(),
          "tran_amount": val.getAmount()
        })
      }

      if (tmp_tran.length - 1 == index) {
        this.tran_date.push({
          "date": this.dateHelper(tmp_date),
          "tran_detail": this.tran_detail
        })
      }

    })
    console.log(this.tran_date)
  }

  load_transaction() {
    this.account.loadWallet(this.account.getWallet()[this.currentWalletIndex].getId()).then(
      (tran) => { this.account.getWallet()[this.currentWalletIndex].transaction = tran; }
    ).then(
      () => { this.calculateTotal() }
    ).then(
      () => { this.format_transaction() }
    );
  }

  async Show_Year_Summary() {
    let opts: PickerOptions = {
      cssClass: 'academy-picker',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'Year',
          options: this.arr_option
        }, {
          name: 'Month',
          options: [
            { text: 'Month ', value: 'Month' },
            { text: 'January ', value: 'January' },
            { text: 'February ', value: 'February' },
            { text: 'March ', value: 'March' },
            { text: 'April ', value: 'April' },
            { text: 'May ', value: 'May' },
            { text: 'June ', value: 'June' },
            { text: 'July ', value: 'July' },
            { text: 'August ', value: 'August' },
            { text: 'September ', value: 'September' },
            { text: 'October ', value: 'October' },
            { text: 'November ', value: 'November' },
            { text: 'December ', value: 'December' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let Year = await picker.getColumn('Year');
      this.Year = Year.options[Year.selectedIndex].value;
      let Month = await picker.getColumn('Month');
      this.Month = Month.options[Month.selectedIndex].value
      this.get_summary_detail();
    });
  }

  async Show_Month_Summary() {
    let opts: PickerOptions = {
      cssClass: 'academy-picker',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Done'
        }
      ],
      columns: [
        {
          name: 'Month',
          options: [
            { text: 'Month ', value: 'Month' },
            { text: 'January ', value: 'January' },
            { text: 'February ', value: 'February' },
            { text: 'March ', value: 'March' },
            { text: 'April ', value: 'April' },
            { text: 'May ', value: 'May' },
            { text: 'June ', value: 'June' },
            { text: 'July ', value: 'July' },
            { text: 'August ', value: 'August' },
            { text: 'September ', value: 'September' },
            { text: 'October ', value: 'October' },
            { text: 'November ', value: 'November' },
            { text: 'December ', value: 'December' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let Month = await picker.getColumn('Month');
      this.Month = Month.options[Month.selectedIndex].value
      this.get_summary_detail();
    });
  }

  ngOnInit() {
  }

  async modal_addTransaction() {
    const modal = await this.modalController.create({
      component: AddTransactionPage,
      componentProps: {
        index: this.currentWalletIndex,
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      this.currentWalletIndex = detail.data;
      console.log(`back from modal => ${this.currentWalletIndex}`);
    }).then(() => {
      return Promise.resolve(
        this.calculateTotal()
      );
    }).then(() => {
      return Promise.resolve(
        this.load_transaction()
      );
    })

    return await modal.present();
  }

  get_summary_detail() {
    this.Income = 0;
    this.Expense = 0;
    var tmp_month = "";
    var str_date = "";
    var tmp_index = this.arr_month.indexOf(this.Month) + 1;
    if (tmp_index) {
      tmp_month = tmp_index != 12 ? `0${tmp_index.toString()}` : tmp_index.toString();
      str_date = `${this.Year}-${tmp_month}`;
      console.log(str_date);
      var json = { "wal_id": this.account.getWallet()[this.currentWalletIndex].getId(), "date": str_date };
      this.databaseService.get_TotalIncome(json).subscribe(res => {
        if (Object.keys(res).length > 0) {
          console.log(res[0].TotalIncome)
          this.Income = res[0].TotalIncome;
          this.loadChert();
        }
      });

      this.databaseService.get_TotalExpense(json).subscribe(res => {
        if (Object.keys(res).length > 0) {
          console.log(res[0].TotalExpense)
          this.Expense = res[0].TotalExpense;
          this.loadChert();
        }
      });
    }
  }

  async presentAlert(tran_id) {
    const alert = await this.alertController.create({
      header: 'Delete',
      message: 'Confirm Delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        }, {
          text: 'Confirm',
          role: 'confirm',
          cssClass: 'secondary',
          handler: () => {
            console.log(`Confirm id: ${tran_id}`);
            var json = {
              "tran_id": tran_id
            }
            this.databaseService.remove_transaction(json).subscribe(res => {
              this.load_transaction();
            })
          }
        }
      ]
    });

    await alert.present();
  }


  backPage() {
    this.navCtrl.navigateBack('/home');
  }
}
