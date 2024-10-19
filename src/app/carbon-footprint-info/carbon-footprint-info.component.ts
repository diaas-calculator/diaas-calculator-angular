import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carbon-footprint-info',
  standalone: true,
  templateUrl: './carbon-footprint-info.component.html',
  styleUrl: './carbon-footprint-info.component.css',
})



export class CarbonFootprintInfoComponent implements OnInit{
  ngOnInit() {
    if (document.readyState !== 'loading') {
      this.initCode()
    }
    else{
      window.addEventListener('DOMContentLoaded', () => {
        this.initCode()
      });
    }
  }

  initCode(){
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
          document.querySelector(`nav li a[href="protein-carbon-footprint-information#${id}"]`)!
            .parentElement!
              .classList.add('active');
        } else {
          document.querySelector(`nav li a[href="protein-carbon-footprint-information#${id}"]`)!.parentElement!.classList.remove('active');
        }
      });
    });
  
    // Track all sections that have an `id` applied
    document.querySelectorAll('h1[id],h2[id],h3[id]').forEach((section) => {
      observer.observe(section);
    });
  }
}
