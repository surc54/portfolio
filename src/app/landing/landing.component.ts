import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../global.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

    constructor(public global: GlobalService) {
        if (this.global.sideNavStatus) {
            this.global.toggleSideNav();
        }
    }

    ngOnInit() {
    }

}
