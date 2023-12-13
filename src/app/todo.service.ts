
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {  todoListApp } from './task.model';
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private dbPath = '/todoListApp'; ProdactsRef: AngularFirestoreCollection<todoListApp>;

  constructor(private db: AngularFirestore) {
    this.ProdactsRef = db.collection(this.dbPath);
  }
  
  getAll(): AngularFirestoreCollection<todoListApp> {
    return this.ProdactsRef;
  }
  update(id: string, data: any): Promise<void> {
    return this.ProdactsRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.ProdactsRef.doc(id).delete();
  }
  create(prodact: todoListApp): any {
    return this.ProdactsRef.add({ ...prodact });
  }
}