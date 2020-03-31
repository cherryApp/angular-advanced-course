import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FibListComponent } from './fib-list.component';

describe('FibListComponent', () => {
  let component: FibListComponent;
  let fixture: ComponentFixture<FibListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FibListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FibListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
