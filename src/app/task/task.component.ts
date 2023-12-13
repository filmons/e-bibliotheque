import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import {  todoListApp } from '../task.model';

import { map } from 'rxjs/operators';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
 listtask?: todoListApp[] = [];
 currentTutorial?: todoListApp | undefined;
 currentIndex = -1;
 updatedTitle: string = '';
 addButton:boolean=false;
 newItem: todoListApp = {
   title: '',
   id: '',
   editing: false,
   newTitle: ''
 };


 constructor(private todoService: TodoService) {}

 ngOnInit(): void {
   this.retrieveTutorials();
   console.log(this.listtask);
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
     this.listtask = data;
     console.log(data);
     console.log(data, "this is the data");
   });
 }
 
 
 setActiveTutorial(task: todoListApp, index: number): void {
   console.log(task, "task")
   console.log(todoListApp, "todotask")
   this.currentTutorial = task;
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

//  
deleteItem(listtask: todoListApp): void {
  if (listtask && listtask.id && this.listtask) {
    this.listtask = this.listtask.filter((item) => item.id !== listtask.id);
    this.todoService.delete(listtask.id).then(() => {
    });
  }
}
toggleEditMode(listtask: todoListApp): void {
  if (this.currentTutorial === listtask) {
    // If already in edit mode, cancel edit mode
    this.currentTutorial = undefined;
    this.updatedTitle = '';
  } else {
    this.currentTutorial = listtask;
    this.updatedTitle = listtask.title || '';
  }
}
updateTutorial(listtask: todoListApp, updatedTitle: string): void {
  if (listtask && listtask.id) {
    this.todoService.update(listtask.id, { title: updatedTitle })
      .then(() => {
        // Update was successful
        console.log('Tutorial updated successfully');
        this.toggleEditMode(listtask); // Exit edit mode
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
