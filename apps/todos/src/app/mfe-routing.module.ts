import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './remote/components/todo-list/todo-list.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { component: TodosComponent, path: '' },
  { path: ':userUid', component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfeRoutingModule {}
