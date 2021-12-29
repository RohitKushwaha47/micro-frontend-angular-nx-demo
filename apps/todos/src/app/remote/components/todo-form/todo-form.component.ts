import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '@mfe/shared/todos';

@Component({
  selector: 'todos-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  public todoForm!: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      body: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.todoForm.valueChanges.subscribe(console.log);
  }

  async submit() {
    if (this.todoForm.valid) {
      const body = this.todoForm.get('body')?.value;

      await this.todoService.createTodo(body);

      this.todoForm.patchValue({ body: '' });
    }
  }
}
