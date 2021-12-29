import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MfeRoutingModule } from './mfe-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './remote/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [CommonModule, MfeRoutingModule, ReactiveFormsModule],
})
export class MfeModule {}
