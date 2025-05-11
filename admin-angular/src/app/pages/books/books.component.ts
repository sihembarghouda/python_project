import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  imports: [CommonModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
books = [
  {
    title: 'Introduction à la programmation',
    author: 'Antoine de Saint-Exupéry',
    image: 'assets/images/1.jpg',
    link: 'https://www.fnac.com/a11301154/AMADE-B-Introduction-a-la-programmation'
  },
  {
    title: 'Python',
    author: 'George Orwell',
    image: 'assets/images/2.jpg',
    link: 'https://www.fnac.com/a17449961/Pour-les-Nuls-Python-3-Pour-les-Nuls'
  },
  {
    title: 'windows 11',
    author: 'Antoine de Saint-Exupéry',
    image: 'assets/images/3.jpg',
    link : 'https://www.fnac.com/a17449961/Pour-les-Nuls-Windows-11-Tout-en-un-Pour-les-Nuls-2e-edition-Woody-Leonhard'
  },
 
];


}
