import { Router } from "@angular/router";
import { FeedService } from "./../../services/feed.service";
import { ToastService } from "./../../services/toast.service";
import { AlertService } from "./../../services/alert.service";
import { LoadingController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

import { Plugins, CameraResultType } from "@capacitor/core";
import {FormBuilder, FormGroup, FormControl, Validators,} from "@angular/forms";

const { Camera } = Plugins;

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.page.html',
  styleUrls: ['./feed-post.page.scss'],
})
export class FeedPostPage implements OnInit {
  imagePath = "";
  feed: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private toastService: ToastService,
    private feedService: FeedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.feed = this.formBuilder.group({
      caption: new FormControl("", Validators.compose([Validators.required])),
      username: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    var images = "data:image/jpeg;base64," + image.base64String;
    this.imagePath = images;
  }

  addFeed() {
    if (this.feed.valid) {
      if (this.imagePath) {
        this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
          loadingEl.present();
          let data = {
           caption: this.feed.value.caption,
           username: this.feed.value.username,
            images: this.imagePath,
          };
          this.feedService.addNewFeed(data).subscribe(
            (res) => {
              loadingEl.dismiss();
              this.toastService.presentToast("Done Posted");
              this.router.navigate(["/feed-admin"]);
            },
            (err) => {
              loadingEl.dismiss();
              this.alertService.showFirebaseAlert(err);
            }
          );
        });
      } else {
        this.toastService.presentToast("Upload picture");
      }
    } else {
      this.toastService.presentToast("Please enter data");
    }
  }
}
