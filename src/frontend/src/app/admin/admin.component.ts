import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../core/user-profile.service';

import * as env from '../../environments/environment';

@Component({
  selector: 'pd-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: UserProfile | null = null;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.httpClient.get(`${env.environment.baseApisUri}/auth/test`).subscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
