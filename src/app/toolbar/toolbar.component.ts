import {Component, OnInit} from '@angular/core';
import $ from 'jquery';
import {Router} from '@angular/router';
import {BreakpointService} from '../breakpoint.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    constructor(protected router: Router, protected breakpoint: BreakpointService) {
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
        let toolbarEnd = lWidth + last.offset().left + pxToNumber(mRight);

        let imgBegin = width - imgWidth;

        let margin;

        if (imgBegin <= toolbarEnd) {
            margin = toolbarEnd - imgBegin;
        } else {
            margin = defaultRightMarginForToolbarLinks;
        }
        last.css('margin-right', margin);
    }
}

function pxToNumber(px: string): number {
    return Number(px.slice(0, px.length - 2));
}
