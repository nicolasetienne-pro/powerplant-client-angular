import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDetailsComponent } from '../../../../../../../app/com/net/apps/powerplant/client/component/plant-details.component';

describe('PlantDetailsComponent', () => {
  let component: PlantDetailsComponent;
  let fixture: ComponentFixture<PlantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
