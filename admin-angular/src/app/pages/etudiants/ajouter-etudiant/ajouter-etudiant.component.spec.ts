import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEtudiantComponent } from './ajouter-etudiant.component';

describe('AjouterEtudiantComponent', () => {
  let component: AjouterEtudiantComponent;
  let fixture: ComponentFixture<AjouterEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
