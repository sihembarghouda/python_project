import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterLink } from '@angular/router';

interface Departement {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-departements',
  imports: [NzTableModule, NzDividerModule, RouterLink],
  templateUrl: './departements.component.html',
  styleUrl: './departements.component.css',
})
export class DepartementsComponent {
  listOfData: Departement[] = [
    {
      id: '1',
      nom: 'Informatique',
    },
    {
      id: '2',
      nom: 'Mathematiques',
    },
    {
      id: '3',
      nom: 'Physique',
    },
    {
      id: '4',
      nom: 'Sciences',
    },
    {
      id: '5',
      nom: 'Biologie',
    },
    {
      id: '6',
      nom: 'Technique',
    },
  ];
}
