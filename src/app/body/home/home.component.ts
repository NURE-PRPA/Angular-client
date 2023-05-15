import { Component } from '@angular/core';
import {Router} from "@angular/router";

type Section = {
  image: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./style-home.scss']
})
export class HomeComponent {
  constructor(private _router: Router) {
  }
  sections: Section[] = [
    {
      image: 'assets/sections.images/programming.jpg',
      name: 'Programming'
    },
    {
      image: 'assets/sections.images/calculus.jpg',
      name: 'Calculus'
    },
    {
      image: 'assets/sections.images/chemistry.jpg',
      name: 'Chemistry'
    },
    {
      image: 'assets/sections.images/geography.png',
      name: 'Geography'
    },
    {
      image: 'assets/sections.images/astronomy.png',
      name: 'Astronomy'
    },
    {
      image: 'assets/sections.images/english.png',
      name: 'English'
    }
  ];

  async onSignUpClick() {
    await this._router.navigate(['/auth/register/'])
  }
}
