import { Feed } from "./../models/feed.mode";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FeedService {
  constructor(public afs: AngularFirestore) {}

  public addNewFeed(values: any): Observable<any> {
    return new Observable<any>((observer) => {
      const docRef = this.afs.collection(`feeds`);
      docRef.add(values).then(
        (res) => {
          console.log(res.id);

          observer.next(res);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  deleteFeed(id: string) {
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`feeds/${id}`);
      docRef.delete().then(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  public getFeedById(id): Observable<Feed> {
    return new Observable<Feed>((observer) => {
      const docRef = this.afs.doc(`feeds/${id}`);
      const userData = docRef.get().subscribe(
        (res: any) => {
          observer.next(res.data());
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });
  }

  public getAllFeed() {
    return this.afs
      .collection("feeds")
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Feed;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
