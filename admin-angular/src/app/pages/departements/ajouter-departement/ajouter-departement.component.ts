import { Component, inject } from '@angular/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DepartementService } from '../../../services/departement.service';

@Component({
  selector: 'app-ajouter-departement',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './ajouter-departement.component.html',
  styleUrl: './ajouter-departement.component.css',
})
export class AjouterDepartementComponent {
  constructor(
    private departementsService: DepartementService,
    private router: Router
  ) {}

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    id: this.fb.control(null, [Validators.required]),
    nom: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.departementsService
        .ajouterDepartement(this.validateForm.value)
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
