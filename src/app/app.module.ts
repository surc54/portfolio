import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './material-imports.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TestComponent } from './test/test.component';
import { ResumeComponent } from './resume/resume.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { LinksComponent } from './links/links.component';
import { DesktopFooterComponent } from './desktop-footer/desktop-footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TestComponent,
    ResumeComponent,
    PortfolioComponent,
    ContactComponent,
    LinksComponent,
    DesktopFooterComponent,
    SidenavComponent,
    MobileFooterComponent,
    ErrorNotFoundComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
