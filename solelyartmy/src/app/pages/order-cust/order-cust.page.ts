import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-order-cust',
  templateUrl: './order-cust.page.html',
  styleUrls: ['./order-cust.page.scss'],
})
export class OrderCustPage implements OnInit {
	posts: any;
 
  constructor(
  private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
) { }

  ngOnInit() {
  }
    ionViewWillEnter() {
    this.getPosts();
  }

  async getPosts(){
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
    this.firestore
    .collection("order")
    .snapshotChanges()
    .subscribe(data => { 
      this.posts = data.map(e => {
        return {
          id: e.payload.doc.id,
          email: e.payload.doc.data()["email"],
          username: e.payload.doc.data()["username"],
          number: e.payload.doc.data()["number"],
          address: e.payload.doc.data()["address"],
          delivery: e.payload.doc.data()["delivery"]
        };
      });

      loader.dismiss();
    });
    
    } catch(e){
    this.showToast(e);

    }
  }

  async deletePost(id: string){
  //show loader
  let loader = this.loadingCtrl.create({
  message: "Please wait..."
  });
  (await loader).present();

  await this.firestore.doc("order/" + id).delete();

  //dismiss loader
  (await loader).dismiss();
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}





