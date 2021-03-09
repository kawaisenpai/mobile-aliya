import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
  trackings: any;
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
) { }

  ngOnInit() {
  }
    ionViewWillEnter() {
    this.getTrackings();
  }

  async getTrackings(){
    //show loader
    let loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();

    try {
    this.firestore
    .collection("tracking")
    .snapshotChanges()
    .subscribe(data => { 
      this.trackings = data.map(e => {
        return {
          id: e.payload.doc.id,
          code: e.payload.doc.data()["code"],
          username: e.payload.doc.data()["username"],
          number: e.payload.doc.data()["number"]
         
        };
      });

      loader.dismiss();
    });
    
    } catch(e){
    this.showToast(e);

    }
  }

  async deleteTrackings(id: string){
  //show loader
  let loader = this.loadingCtrl.create({
  message: "Please wait..."
  });
  (await loader).present();

  await this.firestore.doc("tracking/" + id).delete();

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






 