import {Component, Input, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {PlantService} from '../service/plant.service';
import {PlantType} from '../core/plantType';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';
import {LogService} from '../service/log.service';

@Component({
  selector: 'app-plant-details',
  templateUrl: '../view/plant-details/plant-details.component.html',
  styleUrls: ['../view/plant-details/plant-details.component.css']
})
export class PlantDetailsComponent implements OnInit {

  @Input() plant: Plant;
  selectedType: PlantType;
  plantsTypes$: Observable<PlantType[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private logService: LogService,
    private plantService: PlantService) { }

  ngOnInit(): void {
    this.getPlant();
    this.plantsTypes$ = this.plantService.getPlantsTypes1();
      // .pipe(this.logService.logError<PlantType[]>('getPlantTypes', []));
  }

  getPlant(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.plantService.getPlantById1(id)
      // .pipe(this.logService.logError<Plant>(`fetch plant id:${id}`))
      .subscribe(plant => {
        this.plant = plant;
        this.selectedType = plant.type;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.plantService.updatePlant1(this.plant)
      // .pipe(this.logService.logError<Plant>(`update plant id:${this.plant.id}`))
      .subscribe(() => this.goBack());
  }
}
