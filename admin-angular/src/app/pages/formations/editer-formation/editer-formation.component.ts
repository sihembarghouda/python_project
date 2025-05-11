import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormationService } from '../../../services/formation.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editer-formation',
  imports: [NzFormModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
  templateUrl: './editer-formation.component.html',
  styleUrl: './editer-formation.component.css',
})
export class EditerFormationComponent {
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    nom: this.fb.control('', [Validators.required]),
  });
  formation: any;

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.formationService.getFormation(id).subscribe((data) => {
      this.formation = data;
      this.validateForm.patchValue({
        nom: this.formation.nom,
      });
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.formationService
        .updateFormation(this.formation.id, this.validateForm.value)
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
