import { TestBed, inject } from '@angular/core/testing';
import {PlantService} from '../../../../../../../app/com/net/apps/powerplant/client/service/plant.service';


describe('PlantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlantService]
    });
  });

  it('should be created', inject([PlantService], (service: PlantService) => {
    expect(service).toBeTruthy();
  }));
});
