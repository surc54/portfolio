import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../breakpoint.service';
import {animateChild, query, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss'],
    animations: [
        trigger('animateChildren', [
            transition(':enter, :leave', [
                query('@*', animateChild(), { optional: true })
            ])
        ])
    ]
})
export class PortfolioComponent implements OnInit {

    constructor(public breakpoint: BreakpointService, public router: Router) {
    }

    ngOnInit() {
    }

}
