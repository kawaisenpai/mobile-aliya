
import { BookmarkService } from './../../services/bookmark.service';
import { UserService } from "./../../services/user.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { FormBuilder,FormGroup, FormControl, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


@Component({ 
  selector: "app-bookmark",
  templateUrl: "./bookmark.page.html",
  styleUrls: ["./bookmark.page.scss"],
})
export class BookmarkPage implements OnInit {

  bookmarkProducts = [];
  bookmarkForm: FormGroup;

  constructor(
    
    private alertController: AlertController,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private bookmarkService: BookmarkService,
    private router: Router,
   

  ) { }

  ngOnInit() {
    this.bookmarkForm = this.formBuilder.group({
      
    });
    this.route.queryParams.subscribe((params) => {
      this.bookmarkProducts = this.bookmarkService.getBookmark();
      if (this.bookmarkProducts.length > 0) {
        this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
          loadingEl.present();
          this.userService.getUserDetails().subscribe((resp: any) => {
            loadingEl.dismiss();
            this.bookmarkForm.patchValue({
              email: resp.email,
            });
            console.log(resp);
          });
        });
      }
    });
  }

  loadProducts() {
    this.bookmarkProducts = this.bookmarkService.getBookmark();
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
          cssClass: "dark",
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
    this.bookmarkProducts.splice(
      this.bookmarkProducts.findIndex((product) => product.id === id),
      1
    );
    this.bookmarkService.setBookmark(this.bookmarkProducts);
    this.loadProducts();
  }

  checkOut() {
    if (this.bookmarkForm.valid) {
      let orderData: any;
      let products = [];
      this.bookmarkProducts.forEach(product => {
        let productItem = {
          id: product.id,
          imageUrl: product.imageUrl,
          name: product.name
        }
        products.push(productItem)
      })
      orderData = {
        products: products,
        orderedBy: localStorage.getItem('/email'),
        
      }
    } 
  }
}