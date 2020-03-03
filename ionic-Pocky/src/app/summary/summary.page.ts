import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
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
  Income = '500.00';
  Expense = '200.00';
  Balance = '300.00';
  Currency = 'THB';
  
  constructor(private pickerCtrl: PickerController) { 
    this.sDefaultEmail = 'example@gmail.com';
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
          options: [
            { text: 'Year ', value: 'Year' },
            { text: '2017 ', value: '2017' },
            { text: '2018 ', value: '2018' },
            { text: '2019 ', value: '2019' },
            { text: '2020 ', value: '2020' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let Year = await picker.getColumn('Year');
      this.Year = Year.options[Year.selectedIndex].value
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
    });
  }

  ngOnInit() {
  }

}
