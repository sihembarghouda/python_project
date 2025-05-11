import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterLink } from '@angular/router';
interface Formation {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-formations',
  imports: [NzTableModule, NzDividerModule, RouterLink],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css',
})
export class FormationsComponent {
  listOfData: Formation[] = [
    {
      id: '1',
      nom: 'Master Informatique',
    },
    {
      id: '2',
      nom: 'Master Mathematiques',
    },
    {
      id: '3',
      nom: 'Master Physique et electronique',
    },
    {
      id: '4',
      nom: 'Master Sciences de la vie',
    },
    {
      id: '5',
      nom: 'Licence Biologie',
    },
    {
      id: '6',
      nom: 'Technique de laboratoire',
    },
  ];
}
