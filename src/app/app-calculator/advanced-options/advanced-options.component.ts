import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-advanced-options',
  templateUrl: './advanced-options.component.html',
  imports: [
    CommonModule,
    NgbTooltipModule
  ],
  styleUrls: ['./advanced-options.component.css']
})
export class AdvancedOptionsComponent {
    showAdvancedOptions: boolean = false;
    showHidden: string = sessionStorage.getItem('showHidden') ?? 'false' ;

    setShowHidden(showHidden: string): void {
      sessionStorage.setItem('showHidden', showHidden);
      this.showHidden = showHidden;
      location.reload()
    }

}
