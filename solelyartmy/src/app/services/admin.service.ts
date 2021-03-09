import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { Admin } from "../models/admin.mode";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private snapshotChangesSubscription: any;
  email = localStorage.getItem("email");
  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {}

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  // User related
  public getAdminDetails(): Observable<Admin> {
    return new Observable<Admin>((observer) => {
      const email = localStorage.getItem("email");
      const docRef = this.afs.doc(`admin/${email}`);
      const adminData = docRef.get().subscribe(
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
  public getAdminDetailsById(email): Observable<Admin> {
    return new Observable<Admin>((observer) => {
      const docRef = this.afs.doc(`admin/${email}`);
      const adminData = docRef.get().subscribe(
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

  public loadCurrentAdminDetails() {
    let email = localStorage.getItem("email");
    return this.afs
      .doc(`admin/${email}`)
      .snapshotChanges()
      .pipe(
        map((changes) => {
          let data = changes.payload.data();

          return data;
        })
      );
  }

  public updateAdmin(email: string, value: any): Observable<any> {
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`admin/${email}`);
      docRef.update(value).then(
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

  public addAdmin(adminDetails, email): Observable<any> {
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`admin/${email}`);
      docRef.set(adminDetails).then(
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

  deleteAdmin(email: string) {
    return new Observable<any>((observer) => {
      const docRef = this.afs.doc(`admin/${email}`);
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
}
