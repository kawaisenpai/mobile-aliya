import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SellerPageRoutingModule } from './seller-routing.module';

import { SellerPage } from './seller.page';
import { FileSizeFormatPipe } from './file-size-format.pipe';
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SellerPageRoutingModule
  ],
  declarations: [SellerPage, FileSizeFormatPipe]
})
export class SellerPageModule { }