import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLinkWithHref, RouterLink, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  imports: [RouterOutlet, RouterLinkActive, RouterLinkWithHref, RouterLink, CommonModule, RouterModule],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage {}
