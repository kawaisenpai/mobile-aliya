import { ToastService } from './../../services/toast.service';
import { OrderService } from './../../services/order.service';
import { UserService } from "./../../services/user.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { CartService } from "./../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  cartProducts = [];
  cartForm: FormGroup;
  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastService

  ) { }

  ngOnInit() {
    this.cartForm = this.formBuilder.group({
     
    }); 
    this.route.queryParams.subscribe((params) => {
      this.cartProducts = this.cartService.getCart();
      if (this.cartProducts.length > 0) {
        this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
          loadingEl.present();
          this.userService.getUserDetails().subscribe((resp: any) => {
            loadingEl.dismiss();
            this.cartForm.patchValue({
              email: resp.email,
            });
            console.log(resp);
          });
        });
      }
    });
  }

  loadProducts() {
    this.cartProducts = this.cartService.getCart();
  }

  async removeProduct(id) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Delete",
      message: "Delete this product from cart?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => { },
        },
        {
          text: "Yes",
          handler: () => {
            this.doRemove(id);
          },
        },
      ],
    });

    await alert.present();
  }

  doRemove(id) {
    this.cartProducts.splice(
      this.cartProducts.findIndex((product) => product.id === id),
      1
    );
    this.cartService.setCart(this.cartProducts); 
    this.loadProducts();
  }

  calculatePrice(product) {
    return parseFloat(product.price) * product.selectedAmount;
  }
 
  getTotal() {
    let total = 0;
    this.cartProducts.forEach((product) => {
      total = total + parseFloat(product.price) * product.selectedAmount;
    });
    return total;
  }

  checkOut() { 
    if (this.cartForm.valid) {
      let orderData: any;
      let products = [];
      this.cartProducts.forEach(product => {
        let productItem = {
          id: product.id,
          amount: product.selectedAmount,
          name: product.name
        }
        products.push(productItem)
      }) 
      orderData = {
        products: products,
        totalPrice: this.getTotal(),
        orderedBy: localStorage.getItem('checkout'),
      }
      
      this.orderService.setOrderData(orderData);
      this.router.navigate(['/checkout'])
    } else {
      this.toastService.presentToast("Incomplete Details");
    }
  }
}
