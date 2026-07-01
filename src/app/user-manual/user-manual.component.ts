import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-manual',
  standalone: true,
  templateUrl: './user-manual.component.html',
  styleUrl: './user-manual.component.css',
  imports: [RouterLink]
})



export class UserManualComponent implements OnInit{
  ngOnInit() {
  }

}
