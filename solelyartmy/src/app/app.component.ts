import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { UtilService } from './util.service';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;

  constructor(
    private platform: Platform,
    private util: UtilService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  ngOnInit() {
    this.selectedIndex = 1;
    
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }

  close() {
    menuController.toggle();
  }

  logOut() {
		localStorage.removeItem("email");
		localStorage.removeItem("isUser");
		this.router.navigate(["/signin"]);
	  }
  
}