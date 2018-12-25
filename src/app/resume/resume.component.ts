import { Component, OnInit } from '@angular/core';
import PDFObject from "../../../node_modules/pdfobject/pdfobject.js";
import { BreakpointService } from '../breakpoint.service';
import {animateChild, query, transition, trigger} from '@angular/animations';


@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss'],
    animations: [
        trigger('animateChildren', [
            transition(':enter, :leave', [
                query('@*', animateChild(), { optional: true })
            ])
        ])
    ]
})
export class ResumeComponent implements OnInit {

    constructor(public breakpoint: BreakpointService) { }

    ngOnInit() {
        PDFObject.embed("/assets/resume.pdf", "#resume-pdf", {
            // fallbackLink: `Your browser cannot view this PDF directly on this page.<br>
            //                   Download the file using the button below.`,
            fallbackLink: false
        });
    }

}
