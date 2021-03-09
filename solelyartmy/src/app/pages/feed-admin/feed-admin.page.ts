import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertService } from "./../../services/alert.service";
import { FeedService } from "./../../services/feed.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-feed-admin',
  templateUrl: './feed-admin.page.html',
  styleUrls: ['./feed-admin.page.scss'],
})
export class FeedAdminPage implements OnInit {

  feed = [];

  constructor( 
    private loadingCtrl: LoadingController,
    private feedService: FeedService,
    private alertService: AlertService,
    private router: Router
  ) {}
 
  
  ngOnInit() {
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

  feedClicked(id) {
    this.router.navigate(["/delete-post"], { queryParams: { id: id } });
  }
}


 