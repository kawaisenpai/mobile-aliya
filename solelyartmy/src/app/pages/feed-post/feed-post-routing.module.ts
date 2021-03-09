import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedPostPage } from './feed-post.page';

const routes: Routes = [
  {
    path: '',
    component: FeedPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedPostPageRoutingModule {}
