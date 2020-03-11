import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
  { path: 'add-new-wallet', loadChildren: () => import('./add-new-wallet/add-new-wallet.module').then(m => m.AddNewWalletPageModule) },
  { path: 'wallet-detail', loadChildren: () => import('./wallet-detail/wallet-detail.module').then(m => m.WalletDetailPageModule) },
  { path: 'add-transaction', loadChildren: () => import('./add-transaction/add-transaction.module').then(m => m.AddTransactionPageModule) }
  // { path: 'edit-transaction', loadChildren: () => import('./edit-transaction/edit-transaction.module').then(m => m.EditTransactionPageModule) }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
