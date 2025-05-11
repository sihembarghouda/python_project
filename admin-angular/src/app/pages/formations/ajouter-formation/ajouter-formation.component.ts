import { FormationService } from './../../../services/formation.service';
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

@Component({
  selector: 'app-ajouter-formation',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './ajouter-formation.component.html',
  styleUrl: './ajouter-formation.component.css',
})
export class AjouterFormationComponent {
  constructor(
    private formationService: FormationService,
    private router: Router
  ) {}

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    id: this.fb.control(null, [Validators.required]),
    nom: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.formationService
        .ajouterFormation(this.validateForm.value)
        .subscribe((res) => {
          this.router.navigate(['/formations']);
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
