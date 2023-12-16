// BookComponent
import { Component } from '@angular/core';
import { BookService } from '../services/book.service';
import {  Books } from '../book.model';
import { AuthService } from '../services/auth.service';

import { map } from 'rxjs/operators';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
 listtask: Books[] = [];
 currentTutorial?: Books | undefined;
 searchTerm: string = '';
filteredTasks: Books[] = [];
userEmail: string = '';
 currentIndex = -1;
 updatedTitle: string = '';
 addButton:boolean=false;
 newItem: Books = {
   title: '',
   id: '',
   editing: false,
   newTitle: '',
   isAvailable: false,
 };


 constructor(
  private bookService: BookService,
  private authService: AuthService) {}

 ngOnInit(): void {
   this.retrieveTutorials();
   this.filteredTasks = this.listtask;

   console.log(this.listtask);
 }

 retrieveTutorials(): void {
   this.bookService.getAll().snapshotChanges().pipe(
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
 
 
 setActiveTutorial(task: Books, index: number): void {
   console.log(task, "task")
   console.log(Books, "todotask")
   this.currentTutorial = task;
   this.currentIndex = index;
 }

 addItem(): void {
  if (this.newItem.title ) {
    this.bookService.create(this.newItem).then(() => {
      this.newItem ={
        title: '',
        id: '',
        editing: false,
        newTitle: '',
        isAvailable: false
      }; 
    });
  }
}

//  
deleteItem(listtask: Books): void {
  if (listtask && listtask.id && this.listtask) {
    this.listtask = this.listtask.filter((item) => item.id !== listtask.id);
    this.bookService.delete(listtask.id).then(() => {
    });
  }
}
toggleEditMode(listtask: Books): void {
  if (this.currentTutorial === listtask) {
    // If already in edit mode, cancel edit mode
    this.currentTutorial = undefined;
    this.updatedTitle = '';
  } else {
    this.currentTutorial = listtask;
    this.updatedTitle = listtask.title || '';
  }
}
updateTutorial(listtask: Books, updatedTitle: string): void {
  if (listtask && listtask.id) {
    this.bookService.update(listtask.id, { title: updatedTitle })
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

searchTasks(): void {
  if (!this.searchTerm) {
    this.filteredTasks = [...this.listtask]; // Use a spread operator to copy the array
  } else {
    this.filteredTasks = this.listtask.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

refreshList(): void {
  this.currentTutorial = undefined;
  this.currentIndex = -1;
  this.searchTerm = '';
  this.searchTasks(); // Call searchTasks to reset the filtered list
}

showAttachField(task: Books): void {
  task.showAttachField = true;
}

// ici
attachTaskToUser(taskId: string, userEmail: string) {
  this.authService.getUserByEmail(userEmail).subscribe(async users => {
    if (users.length > 0) {
      const user = users[0];
      console.log(user, "this is the user in attachTaskToUser function");
      
      // Prepare the data object with the user ID
      const dataToUpdate = { userId: user.id,isAvailable: true };

      // Update the task with this user's ID using TaskService
      console.log(`About to update task with ID: ${taskId}`);
      await this.bookService.update(taskId, dataToUpdate);
      console.log(`Updated task with ID: ${taskId}`);
      

       const task = this.filteredTasks.find(t => t.id === taskId);
      // console.log(`Found task after update:`, task);

      if (task) {
        task.showAttachField = false; // Hide the attach fields
      }
    } else {
      // Handle the case where no user is found
      console.error('No user found with this email:', userEmail);
    }
  }, error => {
    console.error('Error retrieving user by email:', error);
  });
}


updateTaskWithUserId(taskId: string, userId: string) {
  // Implement the logic to update the task with the user ID
  // This could involve calling Firestore to update the task document
}

}
