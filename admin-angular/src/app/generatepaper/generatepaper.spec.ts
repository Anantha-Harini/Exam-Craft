import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Generatepaper } from './generatepaper';

describe('Generatepaper', () => {
  let component: Generatepaper;
  let fixture: ComponentFixture<Generatepaper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Generatepaper],
    }).compileComponents();

    fixture = TestBed.createComponent(Generatepaper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
