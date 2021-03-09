import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertService } from "./../../services/alert.service";
import { ProductService } from "./../../services/product.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-seller',
  templateUrl: './seller.page.html',
  styleUrls: ['./seller.page.scss'],
})

export class SellerPage implements OnInit {

  products = [];

  constructor(
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private alertService: AlertService,
    private router: Router
  ) {}

  
  ngOnInit() {
    this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
      loadingEl.present();
      this.productService.getAllProducts().subscribe(
        (res) => {
          loadingEl.dismiss();
          console.log(res);
          this.products = res;
        },
        (err) => {
          loadingEl.dismiss();
          this.alertService.showFirebaseAlert(err);
        }
      );
    });
  }

  productClicked(id) {
    this.router.navigate(["/edit-shop"], { queryParams: { id: id } });
  }

logOut() {
  localStorage.removeItem("email");
  localStorage.removeItem("isAdmin"); 
  this.router.navigate(["/choose"]);
}
}

