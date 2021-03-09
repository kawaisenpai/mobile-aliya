import { Component, OnInit } from '@angular/core';
import { LoadingController } from "@ionic/angular";
import { FeedService } from "./../../services/feed.service";
import { ToastService } from "./../../services/toast.service";
import { AlertService } from "./../../services/alert.service";
import { DataService } from "src/app/services/data.service";
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})

export class FeedPage implements OnInit {
  public categories = [];
  feed = [];
 
  constructor(
    private data: DataService,
    private toastService: ToastService,
    private feedService: FeedService,
    private alertService: AlertService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.categories = this.data.getCategories();
    this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
      loadingEl.present();
      this.feedService.getAllFeed().subscribe(
        (res) => {
          loadingEl.dismiss();
          console.log(res);
          this.feed = res;
        },
        (err) => {
          loadingEl.dismiss();
          this.alertService.showFirebaseAlert(err);
        }
      );
    });
  }
}