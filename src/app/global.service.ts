import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    sideNavStatus = false;
    dark = false;

    animationTiming = "cubic-bezier(0.165, 0.84, 0.44, 1)";

    constructor() {
    }

    toggleSideNav() {
        this.sideNavStatus = !this.sideNavStatus;
    }
}
