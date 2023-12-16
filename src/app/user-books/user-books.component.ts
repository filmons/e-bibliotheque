// In user-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import {  Books } from '../book.model';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html'
})
export class UserBooksComponent implements OnInit {
  userTasks: Books[] = [];
   // Use the Task model here
  constructor(private taskService: BookService, private authService: AuthService) {}
  ngOnInit() {
    this.loadAttachedTasks();
  }

  
  loadAttachedTasks() {
    console.log("Loading attached tasks...");
    this.taskService.getAttachedTasks().subscribe((tasks: Books[]) => {
      console.log("Tasks loaded:", tasks); // Check the loaded tasks
      this.userTasks = tasks;
    }, error => {
      console.error("Error loading tasks:", error); // Log errors if any
    });
  }

returnTask(id: string) {
  console.log(`Attempting to return task with ID: ${id}`);
  this.taskService.detachTaskFromUser(id).then(() => {
    console.log(`Task with ID: ${id} detached from user.`);
    this.taskService.update(id, { isAvailable: false })
      .then(() => {
        console.log(`Task with ID: ${id} has been marked as available.`);
        this.loadAttachedTasks();
      })
      .catch(error => {
        console.error(`Error marking task with ID: ${id} as available:`, error);
      });
  }).catch(error => {
    console.error(`Error detaching task with ID: ${id}:`, error);
  });
}

}
