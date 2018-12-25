import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../breakpoint.service';
import {animateChild, query, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    animations: [
        trigger('animateChildren', [
            transition(':enter, :leave', [
                query('@*', animateChild(), { optional: true })
            ])
        ])
    ]
})
export class ContactComponent implements OnInit {

    constructor(public breakpoint: BreakpointService) {
    }

    ngOnInit() {
    }

}
