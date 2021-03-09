import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UploaderPage } from './uploader.page';
import { ReactiveFormsModule } from "@angular/forms";
import { UploaderPageRoutingModule } from './uploader-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UploaderPageRoutingModule
	
  ],
  declarations: [UploaderPage]
})
export class UploaderPageModule {}