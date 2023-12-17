// In user-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import {  Books } from '../../models/book.model';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html'
})
export class UserBooksComponent implements OnInit {
  userTasks: Books[] = [];
  currentPage: string = 'Mes emprunts';
   // Use the Task model here
  constructor(private taskService: BookService, private authService: AuthService) {}
  ngOnInit() {
    this.loadAttachedTasks();
  }

  
  loadAttachedTasks() {
    this.taskService.getAttachedTasks().subscribe((tasks: Books[]) => {
      this.userTasks = tasks;
    }, error => {
      console.error("Error loading tasks:", error); // Log errors if any
    });
  }

returnTask(id: string) {
  this.taskService.detachTaskFromUser(id).then(() => {
    this.taskService.update(id, { isAvailable: false })
      .then(() => {
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
