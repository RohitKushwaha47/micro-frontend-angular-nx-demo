import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mfe-demo-prototype-todo-list-item',
  template: `
    <div>
      Todo Item List Works!
    </div>
  `,
  styles: [],
})
export class TodoListItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
