import { Component } from '@angular/core';
import { TodoService } from '../../todo.service';
import { ToDoListApp } from '../../models/book.model';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})

export class BookComponent {
  listbook?: ToDoListApp[] = [];
  currentTutorial?: ToDoListApp | undefined;
  currentIndex = -1;
  updatedTitle: string = '';
  addButton:boolean=false;
  newItem: ToDoListApp = {
    title: '',
    id: '',
    editing: false,
    newTitle: ''
  };

  currentBookPage: string = 'E-Books';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    console.log(this.listbook);
  }

  refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.todoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data();
          const docId = c.payload.doc.id;
          const result = { ...data, id: docId };
          return result;
        })
      )
    ).subscribe(data => {
      this.listbook = data;
      console.log(data);
      console.log(data, "this is the data");
    });
  }
 
  setActiveTutorial(book: ToDoListApp, index: number): void {
    console.log(book, "book")
    console.log(ToDoListApp, "todobook")
    this.currentTutorial = book;
    this.currentIndex = index;
  }

  addItem(): void {
    if (this.newItem.title ) {
      this.todoService.create(this.newItem).then(() => {
        this.newItem ={
          title: '',
          id: '',
          editing: false,
          newTitle: ''
        }; 
      });
    }
  }

  deleteItem(listbook: ToDoListApp): void {
    if (listbook && listbook.id && this.listbook) {
      this.listbook = this.listbook.filter((item) => item.id !== listbook.id);
      this.todoService.delete(listbook.id).then(() => {
      });
    }
  }

  toggleEditMode(listbook: ToDoListApp): void {
    if (this.currentTutorial === listbook) {
      this.currentTutorial = undefined;
      this.updatedTitle = '';
    } else {
      this.currentTutorial = listbook;
      this.updatedTitle = listbook.title || '';
    }
  }

  updateTutorial(listbook: ToDoListApp, updatedTitle: string): void {
    if (listbook && listbook.id) {
      this.todoService.update(listbook.id, { title: updatedTitle })
        .then(() => {
          console.log('Tutorial updated successfully');
          this.toggleEditMode(listbook);
        })
        .catch((error) => {
          console.error('Error updating tutorial:', error);
        });
    }
  }

  showForms(){
    this.addButton = !this.addButton;
  }
}