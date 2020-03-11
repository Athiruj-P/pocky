import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { DatabaseService } from 'src/app/services/database.service';

/**
 * Import classes from pattern.component.ts
 * เข้าถึงคลาสต่าง ๆ ที่ต้องใช้ โดยกำหนดชื่อของคลาสที่ต้องการ
 * Author: Athiruj Poositaporn
 * Create date: 28/02/2020
 */
import { Account } from '../pattern.component';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  sDefaultEmail : string;
  selected = [''];
  Year = 'Year';
  Month = 'Month';
  Current = '300.00';
  Income = 0;
  Expense = 0;
  Currency = 'THB';
  arr_option = [];
  arr_month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  constructor(private pickerCtrl: PickerController, private account: Account, private databaseService: DatabaseService) { 
    this.sDefaultEmail = 'example@gmail.com';
    var json = {
      "wal_id" : 5,
      "date" : "2020-03"
    }

    databaseService.get_year({"wal_id":5}).subscribe(res=>{
      res.forEach(val => {
        this.arr_option.push({text:val.Year , value:val.Year});
      });
    })

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
      this.Month = Month.options[Month.selectedIndex].value;
    });
  }

  ngOnInit() {
  }

}
