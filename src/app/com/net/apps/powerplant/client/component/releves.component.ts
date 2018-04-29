import {Component, Input, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {ReleveService} from '../service/releve.service';
import {Releve} from '../core/releve';
import {LogService} from '../service/log.service';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-releves',
  templateUrl: '../view/releves/releves.component.html',
  styleUrls: ['../view/releves/releves.component.css']
})
export class RelevesComponent implements OnInit {

  @Input() plant: Plant;

  releves: Releve[];

  constructor(private releveService: ReleveService,
              private logService: LogService) {
  }

  ngOnInit() {
    let plantId = this.plant.id;
    let userId = -1;
    this.releveService.getReleves1(plantId, userId)
      // .pipe(this.logService.logError<Releve[]>(`getReleves plant :${plantId} user:${userId}`))
      .subscribe(releves => this.releves = releves);
  }


}
