import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  profileForm!: FormGroup;
  constructor(private login: LoginService, private builder: FormBuilder, private router: Router, private toast: ToastrService) {

  }
  ngOnInit(): void {
    this.onformLoad();
  }
  onsubmit() {
    if (this.profileForm.valid) {

      this.login.UserLogin(this.profileForm.value).subscribe((res: any) => {
        if (res.code == 200) {
          console.log(res.data)

        }
      })
    }
  }

  onformLoad(): void {
    this.profileForm = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(4)]]
    })
  }
  get controls() {
    return this.profileForm.controls
  }

}
