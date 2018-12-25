import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../global.service';

// tslint:disable-next-line
@Component({
  selector: 'app-error-not-found',
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.scss']
})
export class ErrorNotFoundComponent implements OnInit {

  constructor(public global: GlobalService) { }

  ngOnInit() {
  }

}
