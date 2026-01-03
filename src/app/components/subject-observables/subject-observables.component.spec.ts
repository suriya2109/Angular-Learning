import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectObservablesComponent } from './subject-observables.component';

describe('SubjectObservablesComponent', () => {
  let component: SubjectObservablesComponent;
  let fixture: ComponentFixture<SubjectObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectObservablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
