import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FanartPageRoutingModule } from './fanart-routing.module';

import { FanartPage } from './fanart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FanartPageRoutingModule
  ],
  declarations: [FanartPage]
})
export class FanartPageModule {}
