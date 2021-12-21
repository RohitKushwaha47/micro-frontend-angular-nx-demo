import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mfe-demo-prototype-signup',
  template: `
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <div
        class="flex flex-col items-center justify-start bg-gray-200 rounded-xl shadow-2xl p-4 w-64"
      >
        <div>
          <!-- Image -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-20 w-20 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <form
          [formGroup]="signUpForm"
          (submit)="submit()"
          class="flex flex-col items-start justify-center space-y-4 w-full"
        >
          <div class="flex flex-col items-start justify-start w-full">
            <label for="name" class="text-xs font-semibold my-1">Name</label>
            <input
              type="text"
              name="name"
              class="rounded focus:outline-none p-1 w-full"
              formControlName="name"
            />
          </div>
          <div class="flex flex-col items-start justify-start w-full">
            <label for="email" class="text-xs font-semibold my-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              class="rounded focus:outline-none p-1 w-full"
              formControlName="email"
            />
          </div>
          <div class="flex flex-col items-start justify-start w-full">
            <label for="passoword" class="text-xs font-semibold my-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              class="rounded focus:outline-none p-1 w-full"
              formControlName="password"
            />
          </div>

          <button
            type="submit"
            class="p-1 bg-green-600 rounded-lg w-full font-bold text-gray-50"
          >
            SignUp
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: '',
      email: '',
      password: '',
    });
  }

  submit() {
    console.log(this.signUpForm.value);
  }
}
