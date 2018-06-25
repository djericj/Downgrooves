import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixesComponent } from './mixes.component';

describe('MixesComponent', () => {
  let component: MixesComponent;
  let fixture: ComponentFixture<MixesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
