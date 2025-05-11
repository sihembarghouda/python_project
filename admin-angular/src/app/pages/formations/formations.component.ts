import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterLink } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
interface Formation {
  id: string;
  nom: string;
}

@Component({
  selector: 'app-formations',
  imports: [NzTableModule, NzDividerModule, RouterLink, NzButtonModule],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css',
})
export class FormationsComponent {
  formations: Formation[] = [];

  constructor(private formationService: FormationService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.formationService.getFormations().subscribe((data: Formation[]) => {
      this.formations = data;
    });
  }

  deleteFormation(id: any) {
    this.formationService.deleteFormation(id).subscribe(() => {
      this.loadData();
    });
  }
}
