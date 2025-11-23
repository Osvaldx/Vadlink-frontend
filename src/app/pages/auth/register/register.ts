import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormRegister } from "../../../components/form-register/form-register";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormRegister],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

}
