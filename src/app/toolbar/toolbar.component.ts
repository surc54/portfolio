import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import $ from 'jquery';
import {Router} from '@angular/router';
import {BreakpointService} from '../breakpoint.service';
import {GlobalService} from '../global.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    animations: [
        trigger("menuButtonEntry", [
            state("void", style({
                opacity: 0,
                transform: "translateX(-50px)",
                width: 0,
                paddingRight: 0,
                paddingLeft: 0,
                marginRight: 0,
                marginLeft: 0
            })),
            transition(":enter", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)")),
            transition(":leave", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)")),
        ]),
        trigger("linksEntry", [
            state("void", style({
                opacity: 0,
                // transform: "translateX(100px)",
                // width: 0,
            })),
            transition(":enter", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)")),
            transition(":leave", animate("0.25s 0s cubic-bezier(0.165, 0.84, 0.44, 1)")),
        ]),
    ]
})
export class ToolbarComponent implements OnInit {


    constructor(protected router: Router, protected breakpoint: BreakpointService, protected global: GlobalService) {
    }


    ngOnInit() {

        let last = $('mat-toolbar').find('div.container').find('div.links').last();
        let defaultRightMarginForToolbarLinks = last.css('margin-right');

        // Initial adjust on component load
        $(() => {
            this.adjustToolbarLinkMargin(window.innerWidth, defaultRightMarginForToolbarLinks);
        });

        $(window).on('resize', e => {
            if (this.breakpoint.handset) {
                return;
            }
            this.adjustToolbarLinkMargin(e.target.innerWidth, defaultRightMarginForToolbarLinks);
        });

        // setInterval(() => {
        //     this.adjustToolbarLinkMargin(window.innerWidth, defaultRightMarginForToolbarLinks);
        // }, 5000);

    }


    adjustToolbarLinkMargin(
        width: number,
        defaultRightMarginForToolbarLinks: number,
        last = $('mat-toolbar').find('div.container').find('div.links').last(),
        img = $('mat-toolbar').find('img#logo'),
    ) {
        if (this.breakpoint.handset) {
            return;
        }

        let imgWidth = img.width();

        let mRight = last.css('margin-right').toString();
        let lWidth = last.width() + pxToNumber(last.css('padding-left')) + pxToNumber(last.css('padding-right'));
        let toolbarEnd = lWidth + last.offset().left + pxToNumber(mRight) + 30;

        let imgBegin = width - imgWidth;

        let margin;

        if (imgBegin <= toolbarEnd) {
            margin = toolbarEnd - imgBegin;
        } else {
            margin = defaultRightMarginForToolbarLinks;
        }
        margin = Math.ceil(margin);
        last.css('margin-right', margin);
    }

    linksAnimDone(event) {
        let last = $('mat-toolbar').find('div.container').find('div.links').last();
        let defaultRightMarginForToolbarLinks = last.css('margin-right');
        this.adjustToolbarLinkMargin(window.innerWidth, defaultRightMarginForToolbarLinks);
    }
}

function pxToNumber(px: string): number {
    return Number(px.slice(0, px.length - 2));
}
