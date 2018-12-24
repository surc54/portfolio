import {Component, OnInit} from '@angular/core';
import {BreakpointService} from '../breakpoint.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    constructor(public breakpoint: BreakpointService) {
    }

    ngOnInit() {
    }

}
