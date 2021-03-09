import { AlertService } from "./../../services/alert.service";
import { AdminService } from "./../../services/admin.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators, } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private adminService: AdminService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ),
    });
  }

  async handleLoginUser() {
    if (this.loginForm.valid) {
      this.loadingCtrl
        .create({ keyboardClose: true, cssClass: "loading-ctrl" })
        .then((loadingEl) => {
          loadingEl.present();
          let userDetails = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password,
          };
          this.authenticationService.loginUser(userDetails).then(
            (res) => {
              localStorage.setItem("email", this.loginForm.value.email);

              this.adminService.getAdminDetails().subscribe(
                (resp: any) => {
                  loadingEl.dismiss();
                  if (resp.isAdmin) {
                    localStorage.setItem("isAdmin", resp.isAdmin);
                    this.router.navigate(["/seller"]);
                  } else {
                    localStorage.setItem("isAdmin", "false");
                    this.router.navigate(["/seller"]);
                  }
                },
                async (err) => {
                  loadingEl.dismiss();
                  await this.alertService.showFirebaseAlert(err);
                }
              );
              this.loginForm.reset();
            },
            async (err) => {
              loadingEl.dismiss();
              const alert = await this.alertCtrl.create({
                header: "Invalid Data",
                message: err.message,
                buttons: ["Okay"],
              });
              await alert.present();
            }
          );
        });
    } else {
      const alert = await this.alertCtrl.create({
        header: "Try again",
        message: "Wrong email or password",
        buttons: ["OK"],
      });

      await alert.present();
    }
  }
}
