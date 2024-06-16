import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  imports: [
    CommonModule,
  ],
  styleUrls: ['./lang.component.css']
})
export class LangComponent {
    lang: string = sessionStorage.getItem('lang') ?? 'en' ;


    setLang(lang: string): void {
        sessionStorage.setItem('lang', lang);
        this.lang = lang;
        location.reload()
    }



    getSelectedStyle(){
        return {'border':'1px solid black'}
    }

    getNotSelectedStyle(){
        return {'border':'0px'}
    }

}
