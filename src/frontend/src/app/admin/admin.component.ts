import { Component, OnInit } from '@angular/core';
import { AuthService, IUser } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pd-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user?: IUser;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.httpClient.get('http://localhost:613/api/auth/test').subscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
