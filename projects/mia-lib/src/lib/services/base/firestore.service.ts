import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

@Injectable()
export abstract class FireStoreService<T> {

  protected abstract basePath: string;
  protected firestore = inject(AngularFirestore);

  doc$(id: string): Observable<T> {
    return this.firestore.doc<T>(`${this.basePath}/${id}`).valueChanges();
  }

  collection$(queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(`${this.basePath}`, queryFn).valueChanges();
  }

  create(value: T): Observable<void> {
    const id = this.firestore.createId();
    const create$ = this.collection.doc(id).set(Object.assign({}, { id }, value));
    return from(create$);
  }

  delete(id: string): Observable<void> {
    const delete$ = this.collection.doc(id).delete();
    return from(delete$);
  }

  private get collection(): AngularFirestoreCollection<T> {
    return this.firestore.collection(`${this.basePath}`);
  }
}