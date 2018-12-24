import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../breakpoint.service';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

    constructor(protected breakpoint: BreakpointService) {
    }

    ngOnInit() {
    }

}
