import { ViewService } from './../../services/view.service';
import { ToastService } from "./../../services/toast.service";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {FormBuilder, FormGroup, FormControl, Validators,} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
 
  accountform: FormGroup;
  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private toastService: ToastService,
    private viewService: ViewService
  ) { }

  ngOnInit() {
    this.accountform = this.formBuilder.group({
      email: new FormControl(
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
        username: new FormControl("", Validators.compose([Validators.required])),
        number: new FormControl("", Validators.compose([Validators.required])),
 
      });
      this.route.queryParams.subscribe((params) => {
        if (this.viewService.getIsNewAccountPage()) {
          this.accountform.reset();
          this.loadingCtrl.create({ keyboardClose: true }).then((loadingEl) => {
            loadingEl.present();
            this.userService.getUserDetails().subscribe(
              (res: any) => {
                console.log(res);
                loadingEl.dismiss();
                this.accountform.patchValue({
                  email: localStorage.getItem("email"),
                  username: res.username,
                  number: res.number,
                });
              },
              (err) => {
                this.alertService.showFirebaseAlert(err);
              }
            );
          });
          this.viewService.setIsNewAccountPage(false);
        }
      });
    }

    logOut() {
      localStorage.removeItem("email");
      localStorage.removeItem("isUser");
      this.router.navigate(["/signin"]);
    }


    updateUser() {
      if (this.accountform.valid) {
        let userData = {
          username: this.accountform.value.username,
          number: this.accountform.value.number,
        };
        this.userService
          .updateUser(localStorage.getItem("email"), userData)
          .subscribe(
            (res) => {
              this.toastService.presentToast("Account Update");
            },
            (err) => {
              this.toastService.presentToast(err.message);
            }
          );
      } else {
        this.toastService.presentToast("Invalid Account");
      }
    }
  }
  
