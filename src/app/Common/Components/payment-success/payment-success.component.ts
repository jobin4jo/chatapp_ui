import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {
  public username = "";
  constructor(private route: Router) {


  }
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.route.navigate(['/chat'])
    // }, 5000);
  }
  onbackPage() {

    this.route.navigate(['/chat'])
  }
}
