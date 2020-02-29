import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewWalletPage } from './add-new-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewWalletPageRoutingModule {}
