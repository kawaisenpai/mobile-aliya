import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
{
path: 'home',
component: HomePage,
children: [
{
path: 'feed',
loadChildren: () =>
import('../pages/feed/feed.module').then(m => m.FeedPageModule)
},
{
path: 'shop',
loadChildren: () =>
import('../pages/shop/shop.module').then(
m => m.ShopPageModule
)
},
{
path: 'order',
loadChildren: () =>
import('../pages/order/order.module').then(
m => m.OrderPageModule
)
},
{
path: 'profile',
loadChildren: () =>
import('../pages/profile/profile.module').then(
m => m.ProfilePageModule
)
}
]
}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class HomeRouter {}