import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTodoService } from '@mfe-demo-prototype/shared/todo';

@Component({
  selector: 'mfe-demo-prototype-todo-form',
  template: `
    <form
      class="flex items-center justify-center"
      [formGroup]="todoForm"
      (submit)="submit()"
    >
      <div class="flex items-center justify-center">
        <input
          type="text"
          name="body"
          id="body"
          class="rounded-l-lg h-8 p-1 focus:outline-none"
          placeholder="Enter you Todo"
          formControlName="body"
        />
        <button
          type="submit"
          class="rounded-r-lg bg-green-600 h-8 w-8 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class TodoFormComponent implements OnInit {
  public todoForm!: FormGroup;

  constructor(private fb: FormBuilder, private todoService: UserTodoService) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      body: ['', [Validators.required, Validators.minLength(5)]],
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
