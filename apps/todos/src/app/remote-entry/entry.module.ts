import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
  },
];

@NgModule({
  declarations: [TodoFormComponent, TodoListComponent, TodoListItemComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class RemoteEntryModule {}
