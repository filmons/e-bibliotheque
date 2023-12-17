
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ToDoListApp } from './models/book.model';
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private dbPath = '/ToDoListApp'; ProdactsRef: AngularFirestoreCollection<ToDoListApp>;

  constructor(private db: AngularFirestore) {
    this.ProdactsRef = db.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<ToDoListApp> {
    return this.ProdactsRef;
  }
  update(id: string, data: any): Promise<void> {
    return this.ProdactsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.ProdactsRef.doc(id).delete();
  }
  create(prodact: ToDoListApp): any {
    return this.ProdactsRef.add({ ...prodact });
  }
}