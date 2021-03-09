import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from "./../../services/authentication.service";
import { NavController } from '@ionic/angular';
import { AdminService } from "./../../services/admin.service";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-register', 
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  registerform: FormGroup;
  showWarnings: boolean = false;
  successMessage: string = '';

 
  constructor(
    private navCtrl: NavController,
    
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  async handleRegister() {
    this.showWarnings = true;

    if (this.registerform.valid) {
      this.loadingCtrl
        .create({ keyboardClose: true, cssClass: "loading-ctrl" })
        .then((loadingEl) => {
          loadingEl.present();
          let userDetails = {
            email: this.registerform.value.email,
            password: this.registerform.value.password,
          };

          this.authenticationService.registerUser(userDetails).then(
            (res) => {
              console.log(res);
              loadingEl.dismiss();
              this.router.navigate(["/login"]);
              let userData = {
                email: this.registerform.value.email,
                password: this.registerform.value.password,
                isAdmin: false,
                registeredDate: new Date().toISOString(),
              };
              this.adminService
                .addAdmin(userData, this.registerform.value.email)
                .subscribe((res) => {
                  console.log("User successfully saved");
                });
            },
            async (err) => {
              loadingEl.dismiss();
              //       this.errorMessage = err.message;
              const alert = await this.alertController.create({
                cssClass: "my-custom-class",
                header: "Alert",
                message: err.message,
                buttons: ["OK"],
              });

              await alert.present();
            }
          );
        });
    }
  }
}
