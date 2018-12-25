import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-desktop-footer',
    templateUrl: './desktop-footer.component.html',
    styleUrls: ['./desktop-footer.component.scss'],
    animations: [
        trigger('desktopFooterEntry', [
            state('void', style({
                height: 0,
                opacity: 0,
                paddingBottom: 0,
                paddingTop: 0
            })),
            transition("* <=> void",
                animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)"))
        ])
    ]
})
export class DesktopFooterComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
