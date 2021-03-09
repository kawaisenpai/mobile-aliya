import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';

import { FeedPostPageRoutingModule } from './feed-post-routing.module';

import { FeedPostPage } from './feed-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FeedPostPageRoutingModule
  ],
  declarations: [FeedPostPage]
})
export class FeedPostPageModule {}
