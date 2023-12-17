import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent]
    });
    fixture = TestBed.createComponent(BookComponent);
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

    component.listbook = []; // Set an initial empty list
    component.addItem(); // Add the new item

    // Check if the newItem is in the list
    expect(component.listbook).toContain(newItem);
  });

  it('should delete an item from the list', () => {
    const itemToDelete = {
      title: 'Item to Delete',
      id: '2',
      editing: false,
      newTitle: ''
    };

    component.listbook = [itemToDelete]; // Set an initial list with the item to delete
    component.deleteItem(itemToDelete); // Delete the item

    // Check if the item is no longer in the list
    expect(component.listbook).not.toContain(itemToDelete);
  });

  // Add more test cases as needed
});
