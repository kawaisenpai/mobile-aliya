import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "./../../services/alert.service";
import { FeedService } from "./../../services/feed.service";
import { LoadingController,  AlertController } from "@ionic/angular";
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastService } from "./../../services/toast.service";
import { FormBuilder, FormGroup, FormControl, Validators, } from "@angular/forms";
@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.page.html',
  styleUrls: ['./delete-post.page.scss'],
})
export class DeletePostPage implements OnInit {

  feedId;
  feedDetails;
  feed: FormGroup;
  images;

  constructor(
    private loadingCtrl: LoadingController,
    private feedService: FeedService,
    private alertService: AlertService,
    private toastService: ToastService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router 
  ) {}

  ngOnInit() {
    this.feed = this.formBuilder.group({
      caption: new FormControl("", Validators.compose([Validators.required])),
      username: new FormControl("", Validators.compose([Validators.required])),
    });
    this.route.queryParams.subscribe((params) => {
      this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
        loadingEl.present();
        this.feedId = params.id;
        this.feedService.getFeedById(this.feedId).subscribe(
          (res) => {
            console.log(res);

            this.feedDetails = res;
            loadingEl.dismiss();
            this.patchDetails();
          },
          (err) => {
            loadingEl.dismiss();
            this.alertService.showFirebaseAlert(err);
          }
        );
      });
    });
  }

  patchDetails() {
    this.images = this.feedDetails.images; 
    this.feed.patchValue({
      caption: this.feedDetails.caption,
      username: this.feedDetails.username,
    });
  }
  
async deleteFeed(id) {
  //show loader
  const alert = await this.alertController.create({
    header: "Delete",
    message: "Delete this post?",
    cssClass: "alert-controller",
    buttons: [
      {
        text: "Cancel",
        role: "cancel",
        handler: (blah) => {},
      },
      {
        text: "Yes",
        handler: () => {
          this.doDelete(id);
        },
      },
    ],
  });
  await alert.present();
}

doDelete(id) {
  this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
    loadingEl.present();
    this.feedService.deleteFeed(this.feedId).subscribe(
      (res) => {
        loadingEl.dismiss();
        this.toastService.presentToast("Post deleted");
        this.router.navigate(["/home/feed"]);
      },
      (err) => {
        loadingEl.dismiss();
        this.alertService.showFirebaseAlert(err);
      }
    );
  });
  
}
}
