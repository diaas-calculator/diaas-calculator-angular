import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-diaas-info',
  standalone: true,
  imports: [
    MarkdownComponent,
  ],
  templateUrl: './diaas-info.component.html',
  styleUrl: './diaas-info.component.css',
})



export class DiaasInfoComponent {

}
