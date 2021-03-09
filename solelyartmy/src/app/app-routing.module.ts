import { NgModule } from '@angular/core';
import { LoginGuard } from "./guards/login.guard";
import { SigninGuard } from "./guards/signin.guard";
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
path: '',
loadChildren: () =>
import('./index/index.module').then(m => m.IndexPageModule)
},
{
path: '',
loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
},
{
  path: "login",
  loadChildren: () =>
    import("./pages/login/login.module").then((m) => m.LoginPageModule),
  canActivate: [LoginGuard],
},
  {
    path: 'seller',
    loadChildren: () => import('./pages/seller/seller.module').then( m => m.SellerPageModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('./pages/guest/guest.module').then( m => m.GuestPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'bookmark',
    loadChildren: () => import('./pages/bookmark/bookmark.module').then( m => m.BookmarkPageModule)
  },
  {
    path: 'uploader',
    loadChildren: () => import('./pages/uploader/uploader.module').then( m => m.UploaderPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'edit-shop',
    loadChildren: () => import('./pages/edit-shop/edit-shop.module').then( m => m.EditShopPageModule)
  },
  {
    path: 'order-cust',
    loadChildren: () => import('./pages/order-cust/order-cust.module').then( m => m.OrderCustPageModule)
  },
  {
    path: 'display',
    loadChildren: () => import('./pages/display/display.module').then( m => m.DisplayPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'feed-post',
    loadChildren: () => import('./pages/feed-post/feed-post.module').then( m => m.FeedPostPageModule)
  },
  {
    path: 'feed-admin',
    loadChildren: () => import('./pages/feed-admin/feed-admin.module').then( m => m.FeedAdminPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule),
    canActivate: [SigninGuard]
  },
  {
    path: 'choose',
    loadChildren: () => import('./pages/choose/choose.module').then( m => m.ChoosePageModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./pages/tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
    path: 'edit-post',
    loadChildren: () => import('./pages/edit-post/edit-post.module').then( m => m.EditPostPageModule)
  },
  {
    path: 'anime',
    loadChildren: () => import('./pages/anime/anime.module').then( m => m.AnimePageModule)
  },
  {
    path: 'digital',
    loadChildren: () => import('./pages/digital/digital.module').then( m => m.DigitalPageModule)
  },
  {
    path: 'fanart',
    loadChildren: () => import('./pages/fanart/fanart.module').then( m => m.FanartPageModule)
  },
  {
    path: 'courier',
    loadChildren: () => import('./pages/courier/courier.module').then( m => m.CourierPageModule)
  },
  {
    path: 'track',
    loadChildren: () => import('./pages/track/track.module').then( m => m.TrackPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  
  
  
 
];
@NgModule({
imports: [
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
],
exports: [RouterModule]
})
export class AppRoutingModule {}