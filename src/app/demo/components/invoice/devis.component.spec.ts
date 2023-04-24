import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisComponent } from './devis.component';
import { DevisModule } from './devis.module';

describe('PRODUCTComponent', () => {
  let component: DevisComponent;
  let fixture: ComponentFixture<DevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
