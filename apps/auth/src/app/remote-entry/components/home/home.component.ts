import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mfe-demo-prototype-home',
  template: ` <div class="h-screen flex items-center justify-center bg-gray-200">
    <div class="p-2 shadow-2xl rounded-lg bg-gray-100">
      This Micro App handling only Authentication
    </div>
  </div> `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
