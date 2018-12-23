import {Injectable} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root'
})
export class BreakpointService {
    handset = false;

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([
            '(max-width: 780px)'
        ]).subscribe(result => {
            this.handset = result.matches;
        });
    }



}
