import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfBarGraphComponent } from './shelf-bar-graph.component';

describe('ShelfBarGraphComponent', () => {
  let component: ShelfBarGraphComponent;
  let fixture: ComponentFixture<ShelfBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
