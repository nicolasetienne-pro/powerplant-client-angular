import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Plant} from '../core/plant';
import {ReleveService} from '../service/releve.service';
import {Releve} from '../core/releve';
import {LogService} from '../service/log.service';
import {User} from '../core/user';
import {Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-releves-history',
  templateUrl: '../view/releves-history/releves-history.component.html',
  styleUrls: ['../view/releves-history/releves-history.component.css']
})
export class RelevesHistoryComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  @Input() plants: Plant[];
  @Input() user: User;

  releves$: Observable<Releve[]>;

  constructor(private releveService: ReleveService,
              private logService: LogService) {
  }

  // lineChart
  public lineChartData: Array<any>;
  public lineChartColors: Array<any>;
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public lineChartLabels: Array<any> = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public lineChartOptions: any = {responsive: true};


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.updateChartWithValues([
      // {data: [28, 48, 40, 19, 86, 27, 90], label: '2017'},
      {data: [18, 48, 77, 9, 100, 27, 40], label: '2018'}
    ]);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
    this.logService.log(e);
  }

  public filterBy(plant: Plant): void {
    let plantId = plant.id;
    let userId = this.user.id;
    this.subscription = this.releveService.getReleves1(plantId, userId)
    //   // .pipe(this.logService.logError<Releve[]>(`getReleves plant :${plantId} user:${userId}`))
      .subscribe(
        (releves: Array<Releve>) => {
          releves.forEach(r => this.logService.log(r));
          this.updateChartWithValues(this.convertToChartArray(releves));
        });
  }

  private convertToChartArray(releves: Array<Releve>): Array<any> {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      _lineChartData[i].data = [];
      releves.forEach(r=> _lineChartData[i].data.push(r.indexCompteur));
      // for (let j = 0; j < releves.length; j++) {
      //   _lineChartData[i].data[j] = releves[j].indexCompteur;
      // }
    }
    return _lineChartData;
  }

  private updateChartWithValues(datas:Array<any>): void {
    this.lineChartColors = [];
    this.lineChartData = datas;
    for (var _i = 0; _i < datas.length; _i++) {

      var red = (Math.floor(Math.random() * 256));
      var green = (Math.floor(Math.random() * 256));
      var blue = (Math.floor(Math.random() * 256));

      this.lineChartColors.push(
        {
          backgroundColor: `rgba(${red},${green},${blue},0.2)`,
          borderColor: `rgba(${red},${green},${blue},1)`,
          pointBackgroundColor: `rgba(${red},${green},${blue},1)`,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: `rgba(${red},${green},${blue},0.8)`
        });
    }
  }
}
