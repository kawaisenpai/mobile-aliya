import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from 'src/app/models/post.mode';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
	

	post = {} as Post;
  id: any;


  constructor(
      private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { 
 this.id = this.actRoute.snapshot.paramMap.get("id");
 }

  ngOnInit() {    
  this.getPostById(this.id); 
  }

    async getPostById(id: string){
  //show loader
  let loader = this.loadingCtrl.create({
  message: "Please wait..."
  });
  (await loader).present();

  this.firestore.doc("order/" + id)
  .valueChanges()
  .subscribe(data => {
    this.post.email = data["email"];
    this.post.username = data["username"];
    this.post.number = data["number"];
    this.post.address = data["address"];
    this.post.delivery = data["delivery"];
  });
  //dismiss loader
  (await loader).dismiss();
  }

  async updatePost(post: Post){
    if(this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
      message: "Please wait..."
      });
      (await loader).present();
  
      try{
       
        await this.firestore.doc("order/" + this.id).update(post);
      } catch(e){
        this.showToast(e);
      }
      //dismiss loader
      (await loader).dismiss();
  
      //redirect to view post page
      this.navCtrl.navigateRoot("view-post");
      }
  }

  formValidation(){
    if(!this.post.email){
      this.showToast("Enter name");
      return false;
    }

    if(!this.post.username){
      this.showToast("Enter email");
      return false;
    }

    if(!this.post.number){
      this.showToast("Enter enquiry");
      return false;
    }

    if(!this.post.address){
      this.showToast("Enter message");
      return false;
    }
    if(!this.post.delivery){
      this.showToast("Enter message");
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




