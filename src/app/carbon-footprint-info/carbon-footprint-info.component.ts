import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carbon-footprint-info',
  standalone: true,
  templateUrl: './carbon-footprint-info.component.html',
  styleUrl: './carbon-footprint-info.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink]
})



export class CarbonFootprintInfoComponent implements OnInit{
  ngOnInit() {
  }

}
