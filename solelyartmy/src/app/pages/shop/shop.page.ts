import { LoadingController } from "@ionic/angular";
import { ProductService } from "./../../services/product.service";
import { ToastService } from "./../../services/toast.service";
import { CartService } from "./../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { BookmarkService } from './../../services/bookmark.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  products = [];
  public categories = [];

  constructor(
    private data: DataService,
    private bookmark: BookmarkService,
    private cartService: CartService,
    private toastService: ToastService,
    private productService: ProductService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
this.categories = this.data.getCategories();
    this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
      loadingEl.present();
      this.productService.getAllProducts().subscribe((res) => {
        loadingEl.dismiss();
        res.forEach((product) => {
          product.amount = 0;
        });
        this.products = res;
      });
    });
  }

  async addToCart(product) {
    product.amount += 1;
    await this.cartService.addProduct(product);
    this.toastService.presentToast("Product added to cart !");
    console.log(this.cartService.getCart());
  }
}