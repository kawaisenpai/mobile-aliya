import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedAdminPageRoutingModule } from './feed-admin-routing.module';

import { FeedAdminPage } from './feed-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedAdminPageRoutingModule
  ],
  declarations: [FeedAdminPage]
})
export class FeedAdminPageModule {}
 