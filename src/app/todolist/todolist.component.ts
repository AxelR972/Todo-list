import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';



@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  taskArray = [{ taskName: 'Brush teeth', isCompleted: false, isEditable: false }];

ngOnInit(): void {
  this.getFromLocalStorage();
}

  onSubmit(form: NgForm) {
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false,
      isEditable: false,
    })

    this.saveToLocalStorage();

    form.reset();
  }

  saveToLocalStorage() {
     let stringJSON = JSON.stringify(this.taskArray);
    localStorage.setItem('todolist', stringJSON);
  }

  getFromLocalStorage(){
    let itemsJSONString = localStorage.getItem('todolist');
    if(itemsJSONString != null){
      this.taskArray = JSON.parse(itemsJSONString);
    }
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);

    this.saveToLocalStorage();
  }

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.saveToLocalStorage();
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
    this.saveToLocalStorage();
  }

  onSave(index: number, newtask: string) {
    this.taskArray[index].taskName = newtask;
    this.taskArray[index].isEditable = false;
    this.saveToLocalStorage();
  }
}
