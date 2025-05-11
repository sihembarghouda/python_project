import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterLink } from '@angular/router';
import { DepartementService } from '../../services/departement.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

interface Departement {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-departements',
  imports: [NzTableModule, NzDividerModule, RouterLink, NzButtonModule],
  templateUrl: './departements.component.html',
  styleUrl: './departements.component.css',
})
export class DepartementsComponent {
  departements: Departement[] = [];

  constructor(private departementService: DepartementService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.departementService
      .getDepartements()
      .subscribe((data: Departement[]) => {
        this.departements = data;
      });
  }

  deleteDepartement(id: any) {
    this.departementService.deleteDepartement(id).subscribe(() => {
      this.loadData();
    });
  }
}
