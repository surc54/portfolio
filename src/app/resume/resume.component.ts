import { Component, OnInit } from '@angular/core';
import PDFObject from "../../../node_modules/pdfobject/pdfobject.js";


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      PDFObject.embed("/assets/resume.pdf", "#example1");
  }

}
