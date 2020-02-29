import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewWalletPageRoutingModule } from './add-new-wallet-routing.module';

import { AddNewWalletPage } from './add-new-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewWalletPageRoutingModule
  ],
  declarations: [AddNewWalletPage]
})
export class AddNewWalletPageModule {}
