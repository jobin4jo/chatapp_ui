import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private user: UserService) {

  }

  users: any = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      console.log(res.id)
      if (res.id != null) {
        this.user.getActiveUserList(res.id).subscribe((res: any) => {
          console.log(res.data);
          this.users = res.data;
          console.log(this.users);
        })
      }
    })
  }

  openUserDetails(user: any) {
    localStorage.removeItem("userDetail");

    // const userData = encodeURIComponent(JSON.stringify(user));
    const userData = JSON.stringify(user);
    localStorage.setItem("userDetail", userData);
    this.router.navigate(['/chat'])
    console.log(user);
  }
}
