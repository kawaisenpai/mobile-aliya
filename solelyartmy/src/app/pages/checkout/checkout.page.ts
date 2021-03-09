import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from "src/app/models/post.mode";
import { CartService } from './../../services/cart.service';
import { OrderService } from './../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Plugins, CameraResultType } from "@capacitor/core";
@Component({ 
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
}) 

export class CheckoutPage implements OnInit {
	imagePath = "";
	post = {} as Post;
  cartProducts = [];
  orderData: any;
  products = [];

  constructor(
  private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cartService: CartService,
    private firestore: AngularFirestore
) { }

  ngOnInit() {

  }

    async createPost(post: Post){
    if(this.formValidation()) {
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();

    try{
      await this.firestore.collection("order").add(post);
    } catch(e){
      this.showToast(e);
    }
    //dismiss loader
    (await loader).dismiss();

    //redirect 
    this.navCtrl.navigateRoot("/home/order");
    }
  } 
  
  formValidation(){
    if(!this.post.email){
      this.showToast("Enter email");
      return false;
    }

    if(!this.post.username){
      this.showToast("Enter username");
      return false;
    }

    if(!this.post.number){
      this.showToast("Enter number");
      return false;
    }

    if(!this.post.address){
      this.showToast("Enter address");
      return false;
    }

    if(!this.post.delivery){
      this.showToast("Enter delivery");
      return false;
    }

    return true;
  }

  loadProducts() {
    this.cartProducts = this.cartService.getCart();
 
  }

  getTotal() {
    let total = 0;
    this.cartProducts.forEach((product) => {
      total = total + parseFloat(product.price) * product.selectedAmount;
      localStorage.getItem('checkout')
    });
    return total;
    
  }


  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }
}