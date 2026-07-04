import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-protein-info',
  standalone: true,
  templateUrl: './protein-info.component.html',
  styleUrl: './protein-info.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink]
})



export class ProteinInfoComponent implements OnInit{
  ngOnInit() {
  }
}
