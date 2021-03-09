import { UserService } from "./../../services/user.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl, } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  showWarnings: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: new FormControl(
        "", 
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      ),

      username: new FormControl("", Validators.compose([Validators.required])),
      number: new FormControl("", Validators.compose([Validators.required])),
     
    
    });
  }

  async handleSignUp() {
    this.showWarnings = true;

    if (this.signupForm.valid) {
      this.loadingCtrl
        .create({ keyboardClose: true, cssClass: "loading-ctrl" })
        .then((loadingEl) => {
          loadingEl.present();
          let userDetails = {
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
          };

          this.authService.signupUser(userDetails).then(
            (res) => {
              console.log(res);
              loadingEl.dismiss();
              this.router.navigate(["/signin"]);
              let userData = {
                username: this.signupForm.value.username,
                email: this.signupForm.value.email,
                password: this.signupForm.value.password,
                number: this.signupForm.value.number,
                isUser: false,
              };
              this.userService
                .addUser(userData, this.signupForm.value.email)
                .subscribe((res) => {
                  console.log("Welcome to solelyartmy");
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
