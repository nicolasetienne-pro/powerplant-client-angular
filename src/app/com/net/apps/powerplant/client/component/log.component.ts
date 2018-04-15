import { Component, OnInit } from '@angular/core';
import {LogService} from '../service/log.service';

@Component({
  selector: 'app-logger',
  templateUrl: '../view/log/log.component.html',
  styleUrls: ['../view/log/log.component.css']
})
export class LogComponent implements OnInit {

  constructor(public logService: LogService) { }

  ngOnInit() {
  }

}
