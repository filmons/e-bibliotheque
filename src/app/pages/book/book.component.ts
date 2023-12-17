import { Component } from "@angular/core";
import { map } from "rxjs/operators";

import { Books } from "../../models/book.model";
import { AuthService } from "../../services/auth.service";
import { BookService } from "../../services/book.service";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent {
  listtask: Books[] = [];
  currentTutorial?: Books | undefined;
  searchTerm: string = "";
  filteredTasks: Books[] = [];
  userEmail: string = "";
  currentIndex = -1;
  updatedTitle: string = "";
  addButton: boolean = false;
  newItem: Books = {
    title: "",
    id: "",
    editing: false,
    newTitle: "",
    isAvailable: false,
  };

  constructor(
    private bookService: BookService,
    private authService: AuthService
  ) {}

  currentBookPage: string = 'E-Books';

  ngOnInit(): void {
    this.retrieveTutorials();
    this.filteredTasks = this.listtask;
  }

  retrieveTutorials(): void {
    this.bookService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const data = c.payload.doc.data();
            const docId = c.payload.doc.id;
            const result = { ...data, id: docId };
            return result;
          })
        )
      )
      .subscribe((data) => {
        this.listtask = data;
      });
  }

  setActiveTutorial(task: Books, index: number): void {
    this.currentTutorial = task;
    this.currentIndex = index;
  }

  addItem(): void {
    if (this.newItem.title) {
      this.bookService.create(this.newItem).then(() => {
        this.newItem = {
          title: "",
          id: "",
          editing: false,
          newTitle: "",
          isAvailable: false,
        };
      });
    }
  }

  deleteItem(listtask: Books): void {
    if (listtask && listtask.id && this.listtask) {
      this.listtask = this.listtask.filter((item) => item.id !== listtask.id);
      this.bookService.delete(listtask.id).then(() => {});
    }
  }
  toggleEditMode(listtask: Books): void {
    if (this.currentTutorial === listtask) {
      this.currentTutorial = undefined;
      this.updatedTitle = "";
    } else {
      this.currentTutorial = listtask;
      this.updatedTitle = listtask.title || "";
    }
  }
  updateTutorial(listtask: Books, updatedTitle: string): void {
    if (listtask && listtask.id) {
      this.bookService
        .update(listtask.id, { title: updatedTitle })
        .then(() => {
          this.toggleEditMode(listtask);
        })
        .catch((error) => {
          console.error("Error updating tutorial:", error);
        });
    }
  }

  showForms() {
    this.addButton = !this.addButton;
  }

  searchTasks(): void {
    if (!this.searchTerm) {
      this.filteredTasks = [...this.listtask];
    } else {
      this.filteredTasks = this.listtask.filter((task) =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.searchTerm = "";
    this.searchTasks();
  }

  showAttachField(task: Books): void {
    task.showAttachField = true;
  }

  attachTaskToUser(taskId: string, userEmail: string) {
    this.authService.getUserByEmail(userEmail).subscribe(
      async (users) => {
        if (users.length > 0) {
          const user = users[0];

          const dataToUpdate = { userId: user.id, isAvailable: true };

          await this.bookService.update(taskId, dataToUpdate);

          const task = this.filteredTasks.find((t) => t.id === taskId);

          if (task) {
            task.showAttachField = false;
          }
        } else {
          console.error("No user found with this email:", userEmail);
        }
      },
      (error) => {
        console.error("Error retrieving user by email:", error);
      }
    );
  }

  updateTaskWithUserId(taskId: string, userId: string) {

  }
}