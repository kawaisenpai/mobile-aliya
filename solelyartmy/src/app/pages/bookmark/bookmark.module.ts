import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';

import { BookmarkPageRoutingModule } from './bookmark-routing.module';

import { BookmarkPage } from './bookmark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookmarkPageRoutingModule
  ],
  declarations: [BookmarkPage]
})
export class BookmarkPageModule {}
