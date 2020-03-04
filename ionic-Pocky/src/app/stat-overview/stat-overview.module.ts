import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatOverviewPageRoutingModule } from './stat-overview-routing.module';

import { StatOverviewPage } from './stat-overview.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatOverviewPageRoutingModule
  ],
  declarations: [StatOverviewPage]
})
export class StatOverviewPageModule {}
export class AppModule {}
