import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-manual',
  standalone: true,
  templateUrl: './user-manual.component.html',
  styleUrl: './user-manual.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink]
})



export class UserManualComponent implements OnInit{
  ngOnInit() {
  }

}
