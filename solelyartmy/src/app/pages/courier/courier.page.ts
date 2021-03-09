import { Component, OnInit } from '@angular/core';
import { Tracking } from "src/app/models/tracking.mode";
import { AngularFirestore} from '@angular/fire/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-courier',
  templateUrl: './courier.page.html',
  styleUrls: ['./courier.page.scss'],
})
export class CourierPage implements OnInit {

  tracking = {} as Tracking;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) { } 

  ngOnInit() {
  }

  async createPost(tracking: Tracking){
    if(this.formValidation()) {
    //show loader
    let loader = this.loadingCtrl.create({
    message: "Please wait..."
    });
    (await loader).present();

    try{
      await this.firestore.collection("tracking").add(tracking);
    } catch(e){
      this.showToast(e);
    }
    //dismiss loader
    (await loader).dismiss();

    //redirect 
    this.navCtrl.navigateRoot("/tracking");
    }
  }
  
  formValidation(){
    if(!this.tracking.code){
      this.showToast("Enter code");
      return false;
    }

    if(!this.tracking.username){
      this.showToast("Enter username");
      return false;
    }

    if(!this.tracking.number){
      this.showToast("Enter number");
      return false;
    }

    return true;
  }


  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }
}
