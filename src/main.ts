import { provideZoneChangeDetection, importProvidersFrom } from "@angular/core";
/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import { appConfig } from './app/app.config';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

bootstrapApplication(AppComponent, {...appConfig, providers: [provideZoneChangeDetection(), ...appConfig.providers, importProvidersFrom(NgbModule)]});

