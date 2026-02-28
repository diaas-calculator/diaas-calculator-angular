import { Component } from '@angular/core';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'app-advanced-options',
  templateUrl: './advanced-options.component.html',
  imports: [
    NgbTooltipModule
],
  styleUrls: ['./advanced-options.component.css']
})
export class AdvancedOptionsComponent {
    showAdvancedOptions: boolean = false;
    showHidden: string = sessionStorage.getItem('showHidden') ?? 'false' ;
    showExpertComments: string = sessionStorage.getItem('showExpertComments') ?? 'false' ;

    setShowHidden(showHidden: string): void {
      sessionStorage.setItem('showHidden', showHidden);
      this.showHidden = showHidden;
      location.reload()
    }

    setShowExpertComments(showExpertComments: string): void {
      sessionStorage.setItem('showExpertComments', showExpertComments);
      this.showExpertComments = showExpertComments;
    }

}
