import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent]
    });
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance; // Access the component instance using fixture
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an item to the list', () => {
    const newItem = {
      title: 'New Item',
      id: '1',
      editing: false,
      newTitle: ''
    };

    component.listtask = []; // Set an initial empty list
    component.addItem(); // Add the new item

    // Check if the newItem is in the list
    expect(component.listtask).toContain(newItem);
  });

  it('should delete an item from the list', () => {
    const itemToDelete = {
      title: 'Item to Delete',
      id: '2',
      editing: false,
      newTitle: ''
    };

    component.listtask = [itemToDelete]; // Set an initial list with the item to delete
    component.deleteItem(itemToDelete); // Delete the item

    // Check if the item is no longer in the list
    expect(component.listtask).not.toContain(itemToDelete);
  });

  // Add more test cases as needed
});
