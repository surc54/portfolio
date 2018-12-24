import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    sideNavStatus = false;

    constructor() {
    }

    toggleSideNav() {
        this.sideNavStatus = !this.sideNavStatus;
    }
}
