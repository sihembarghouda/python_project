import { Component, inject } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartementService } from '../../../services/departement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editer-departement',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './editer-departement.component.html',
  styleUrl: './editer-departement.component.css',
})
export class EditerDepartementComponent {
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    nom: this.fb.control('', [Validators.required]),
  });
  departement: any;

  constructor(
    private departementService: DepartementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.departementService.getDepartement(id).subscribe((data) => {
      this.departement = data;
      this.validateForm.patchValue({
        nom: this.departement.nom,
      });
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.departementService
        .updateDepartement(this.departement.id, this.validateForm.value)
        .subscribe((res) => {
          this.router.navigate(['/departements']);
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
