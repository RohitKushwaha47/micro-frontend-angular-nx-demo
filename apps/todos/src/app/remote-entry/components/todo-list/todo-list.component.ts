import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mfe-demo-prototype-todo-list',
  template: `
    <div>
      <mfe-demo-prototype-todo-form></mfe-demo-prototype-todo-form>
      <mfe-demo-prototype-todo-list-item></mfe-demo-prototype-todo-list-item>
      <mfe-demo-prototype-todo-list-item></mfe-demo-prototype-todo-list-item>
      <mfe-demo-prototype-todo-list-item></mfe-demo-prototype-todo-list-item>
      <mfe-demo-prototype-todo-list-item></mfe-demo-prototype-todo-list-item>
    </div>
  `,
  styles: [],
})
export class TodoListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
