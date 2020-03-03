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
  constructor(private pickerCtrl: PickerController) { 
    this.sDefaultEmail = 'example@gmail.com';
  }

  async show_edit_time() {
    let opts: PickerOptions = {
      cssClass: 'academy-picker',
      buttons: [
        {
          text: 'ยกเลิก'
        },
        {
          text: 'ยืนยัน'
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
      // this.selected = [
      //   timestart.options[timestart.selectedIndex].value
      // ];
      this.Year = Year.options[Year.selectedIndex].value
    });
  }

  ngOnInit() {
  }

}
