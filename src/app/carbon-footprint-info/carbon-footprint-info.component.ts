import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carbon-footprint-info',
  standalone: true,
  templateUrl: './carbon-footprint-info.component.html',
  styleUrl: './carbon-footprint-info.component.css',
  imports: [RouterLink]
})



export class CarbonFootprintInfoComponent implements OnInit{
  ngOnInit() {
  }

}
