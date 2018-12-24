import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../breakpoint.service';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

    constructor(public breakpoint: BreakpointService) {
    }

    ngOnInit() {
    }

}
