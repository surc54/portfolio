import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './test/test.component';
import {ResumeComponent} from './resume/resume.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {ContactComponent} from './contact/contact.component';
import {LinksComponent} from './links/links.component';

const routes: Routes = [
    {
        path: "test",
        component: TestComponent
    },
    {
        path: "resume",
        component: ResumeComponent
    },
    {
        path: "portfolio",
        component: PortfolioComponent
    },
    {
        path: "contact",
        component: ContactComponent
    },
    {
        path: "links",
        component: LinksComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
