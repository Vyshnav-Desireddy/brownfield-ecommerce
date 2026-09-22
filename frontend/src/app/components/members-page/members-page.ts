import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-members-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './members-page.html',
})
export class MembersPage {
  constructor(public authService: AuthService) {}
}
