import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BookmarkService {
  private bookmark = [];

  constructor() { }

  public getBookmark() {
    return this.bookmark;
  }

  public setBookmark(bookmark) {
    this.bookmark = bookmark;
  }

  public resetBookmark() {
    this.bookmark = [];
  }

  public addProduct(product) {
    let added = false;
    let bookmark = this.bookmark;
    for (let item of bookmark) {
      if (item.id === product.id) {
        item.selectedAmount = item.selectedAmount + product.amount;
        added = true;
      }
    }
    if (!added) {
      product.selectedAmount = product.amount;
      bookmark.push(product);
    }
    this.bookmark = bookmark;
  }
}
