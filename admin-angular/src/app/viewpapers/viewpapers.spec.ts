import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewpapers } from './viewpapers';

describe('Viewpapers', () => {
  let component: Viewpapers;
  let fixture: ComponentFixture<Viewpapers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewpapers],
    }).compileComponents();

    fixture = TestBed.createComponent(Viewpapers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
