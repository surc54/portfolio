import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../breakpoint.service';
import {animateChild, query, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss'],
    animations: [
        trigger('animateChildren', [
            transition(':enter, :leave', [
                query('@*', animateChild(), { optional: true })
            ])
        ])
    ]
})
export class LinksComponent implements OnInit {

    constructor(public breakpoint: BreakpointService) {
    }

    ngOnInit() {
    }

}
