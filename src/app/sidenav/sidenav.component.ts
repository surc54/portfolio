import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../global.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    animations: [
        trigger("sideNavAnimation", [
            state("void", style({
                transform: "translateX(-100%)",
            })),
            transition(":enter", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)")),
            transition(":leave", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)"))
        ]),
        trigger("backdropAnimation", [
            state("void", style({
                opacity: "0"
            })),
            transition(":enter", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)")),
            transition(":leave", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)")),
        ]),
    ]
})
export class SidenavComponent implements OnInit {

    constructor(protected router: Router, protected global: GlobalService) {
    }

    ngOnInit() {
    }

}
