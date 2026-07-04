import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-diaas-info',
  standalone: true,
  templateUrl: './diaas-info.component.html',
  styleUrl: './diaas-info.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink]
})



export class DiaasInfoComponent implements OnInit{
  ngOnInit() {
  }

}
