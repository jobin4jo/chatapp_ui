import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../Services/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignalRServiceService } from '../../../Services/signal-rservice.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  profileForm!: FormGroup;
  constructor(private login: LoginService, private builder: FormBuilder, private router: Router, private signalR: SignalRServiceService) {

  }
  ngOnInit(): void {
    this.onformLoad();
  }
  onsubmit() {
    if (this.profileForm.valid) {
      this.login.UserLogin(this.profileForm.value).subscribe((res: any) => {
        if (res.code == 200) {
          console.log(res.data)
          this.signalR.login(res.data.userName);
          this.router.navigate(['/list'], { queryParams: { id: res.data.id } });
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      })

    }
  }

  onformLoad(): void {
    this.profileForm = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(10)]]
    })
  }
  get controls() {
    return this.profileForm.controls
  }

}
