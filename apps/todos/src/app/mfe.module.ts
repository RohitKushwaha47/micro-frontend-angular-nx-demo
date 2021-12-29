import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MfeRoutingModule } from './mfe-routing.module';
import { TodosComponent } from './todos/todos.component';
import { TodoListComponent } from './remote/components/todo-list/todo-list.component';
import { TodoListItemComponent } from './remote/components/todo-list-item/todo-list-item.component';
import { TodoFormComponent } from './remote/components/todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodosComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    MfeRoutingModule,
    ReactiveFormsModule
  ]
})
export class MfeModule { }
