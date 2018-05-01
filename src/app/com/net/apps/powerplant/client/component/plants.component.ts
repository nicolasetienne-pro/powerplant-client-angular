import {Component, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {PlantService} from '../service/plant.service';
import {PlantType} from '../core/plantType';
import {Observable} from 'rxjs/Observable';
import {LogService} from '../service/log.service';
import {Location} from '@angular/common';
import {PlantDetailsComponent} from './plant-details.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plants',
  templateUrl: '../view/plants/plants.component.html',
  styleUrls: ['../view/plants/plants.component.css']
})
export class PlantsComponent implements OnInit {

  model;
  plants: Plant[];
  plantsTypes$: Observable<PlantType[]>;
  plantType: PlantType;

  constructor(private plantService: PlantService,
              private location: Location,
              private modalService: NgbModal,
              private logService: LogService) {
  }

  public ngOnInit() {
    this.getPlants();
    this.plantsTypes$ = this.plantService.getPlantsTypes1()
      // .pipe(this.logService.logError<PlantType[]>('getPlantsTypes', []));
    ;
  }

  public getPlants(): void {
    this.plantService.getPlants1()
      // .pipe(this.logService.logError<Plant[]>('getPlants', []))
      .subscribe(plants => this.plants = plants);
  }

  public add(name: string, type: PlantType, capacity: number): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.plantService.addPlant1({name: name, type: type, capacity: capacity} as Plant)
      // .pipe(this.logService.logError<Plant>('log Plant'))
      .subscribe(_plant => this.plants.push(_plant));
  }

  public delete(plant: Plant): void {
    this.plants = this.plants.filter(p => p !== plant);
    this.plantService.deletePlant1(plant.id)
      // .pipe(this.logService.logError<Plant>('delete Plant'))
      .subscribe();
  }

  public goBack(): void {
    this.location.back();
  }

  public openDetails(plant: Plant): void {
    const modalRef = this.modalService.open(PlantDetailsComponent);
    modalRef.componentInstance.plant = plant;

  }
}
