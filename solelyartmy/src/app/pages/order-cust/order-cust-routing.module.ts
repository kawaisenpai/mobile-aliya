import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderCustPage } from './order-cust.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCustPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCustPageRoutingModule {}
