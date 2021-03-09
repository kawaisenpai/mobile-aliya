import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  isNewOrderPage: boolean = true;
  isNewAccountPage: boolean = true;

  public getIsNewOrderPage() {
    return this.isNewOrderPage;
  }

  public setIsNewOrderPage(isNewOrderPage: boolean) {
    this.isNewOrderPage = isNewOrderPage;
  }

  public getIsNewAccountPage() {
    return this.isNewAccountPage;
  }

  public setIsNewAccountPage(isNewAccountPage: boolean) {
    this.isNewAccountPage = isNewAccountPage;
  }

  logOut() {
    this.isNewOrderPage = true;
    this.isNewAccountPage = true;
  }

}
