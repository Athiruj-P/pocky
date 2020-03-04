import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatOverviewPage } from './stat-overview.page';

const routes: Routes = [
  {
    path: '',
    component: StatOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatOverviewPageRoutingModule {}
