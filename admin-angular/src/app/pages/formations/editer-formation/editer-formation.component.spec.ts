import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerFormationComponent } from './editer-formation.component';

describe('EditerFormationComponent', () => {
  let component: EditerFormationComponent;
  let fixture: ComponentFixture<EditerFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditerFormationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditerFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
