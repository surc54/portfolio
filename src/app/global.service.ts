import {Injectable} from '@angular/core';
import {BreakpointService} from './breakpoint.service';
import {animation} from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    sideNavStatus = false;
    dark = false;

    animationTiming = "cubic-bezier(0.165, 0.84, 0.44, 1)";

    desktopFooterEntryAnimation = animation([
        
    ]);

    constructor(public breakpoint: BreakpointService) {
    }

    toggleSideNav() {
        this.sideNavStatus = !this.sideNavStatus;
    }
}
