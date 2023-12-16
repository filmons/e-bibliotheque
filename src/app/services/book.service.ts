// bookService.get
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {  Books } from '../book.model';
@Injectable({
  providedIn: 'root'
})

export class BookService {
  private dbPath = '/todoListApp'; ProdactsRef: AngularFirestoreCollection<Books>;
  constructor(private db: AngularFirestore,private firestore: AngularFirestore) {
    this.ProdactsRef = db.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<Books> {
    return this.ProdactsRef;
  }
  update(id: string, data: any): Promise<void> {
    return this.ProdactsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.ProdactsRef.doc(id).delete();
  }
  create(prodact: Books): any {
    return this.ProdactsRef.add({ ...prodact });
  }

  getAttachedTasks() {
    console.log("Fetching attached tasks...");
    return this.firestore.collection<Books>('todoListApp',
     ref => ref.where('isAvailable', '==', true)).valueChanges();
  }

  detachTaskFromUser(id: string): Promise<void> {
    return this.firestore.doc(`todoListApp/${id}`).update({
      userId: null,
      detachedDate: new Date() 
    });
  }
} 