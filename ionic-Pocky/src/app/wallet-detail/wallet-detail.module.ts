import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletDetailPageRoutingModule } from './wallet-detail-routing.module';

import { WalletDetailPage } from './wallet-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletDetailPageRoutingModule
  ],
  declarations: [WalletDetailPage]
})
export class WalletDetailPageModule {}
