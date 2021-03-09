import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCustPageRoutingModule } from './order-cust-routing.module';

import { OrderCustPage } from './order-cust.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderCustPageRoutingModule
  ],
  declarations: [OrderCustPage]
})
export class OrderCustPageModule {}
