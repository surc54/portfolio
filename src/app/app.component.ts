import {Component, Inject} from '@angular/core';
import {BreakpointService} from './breakpoint.service';
import {animateChild, query, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('ngIfAnimation', [
            transition(':enter, :leave', [
                query('@*', animateChild(), { optional: true })
            ])
        ])
    ]
})
export class AppComponent {

    constructor(@Inject(BreakpointService) public breakpoint: BreakpointService,
                public router: Router) {
    }


}
