import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
})
export class AddTransactionPage implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }
}
