import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddTransactionPage } from '../add-transaction/add-transaction.page';
@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.page.html',
  styleUrls: ['./wallet-detail.page.scss'],
})
export class WalletDetailPage implements OnInit {

  constructor(public navController: NavController,private route: Router,public modalController:ModalController) { }

  ngOnInit() {
  }

  async modal_addTransaction(){
    const modal = await this.modalController.create({
        component: AddTransactionPage
    }); 
    return await modal.present();
  }
}
