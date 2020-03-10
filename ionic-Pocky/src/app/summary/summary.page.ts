import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  selected = [''];
  constructor(private router: Router, private pickerCtrl: PickerController) { }

  async show_month() {
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
          name: 'month',
          options: [
            { text: 'January ', value: '08:00' },
            { text: 'February ', value: '09:00' },
            { text: 'April ', value: '10:00' },
            { text: 'May ', value: '11:00' },
            { text: 'June ', value: '12:00' },
            { text: 'July ', value: '13:00' },
            { text: 'August ', value: '14:00' },
            { text: 'September ', value: '15:00' },
            { text: 'October ', value: '15:00' },
            { text: 'November ', value: '15:00' },
            { text: 'December ', value: '15:00' }
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let month = await picker.getColumn('month');
      this.selected = [
        month.options[month.selectedIndex].value
      ];
    });
  }  

  ngOnInit() {
  }

}
