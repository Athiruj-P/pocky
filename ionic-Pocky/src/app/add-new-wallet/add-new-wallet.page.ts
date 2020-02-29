import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


// import { AddQueueTypePage } from '../add-queue-type/add-queue-type.page';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-add-new-wallet',
  templateUrl: './add-new-wallet.page.html',
  styleUrls: ['./add-new-wallet.page.scss'],
})
export class AddNewWalletPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

}
