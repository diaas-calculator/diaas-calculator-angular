import { ApplicationConfig } from '@angular/core';

import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../app/http-interceptors/index';
import { noopInterceptorProvider } from '../app/http-interceptors/noop-interceptor';

import { AuthService } from '../app/auth.service';
import { HttpErrorHandler } from '../app/http-error-handler.service';
import { MessageService } from '../app/message.service';
import { RequestCache, RequestCacheWithMap } from '../app/request-cache.service';
// #endregion example helper services; not shown in docs
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { AppRoutes } from './app.routes';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      AppRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})),
    provideHttpClient(),
    provideMarkdown({ loader: HttpClient }),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientJsonpModule),
    noopInterceptorProvider,
    httpInterceptorProviders,
    importProvidersFrom(
        HttpClientXsrfModule.withOptions({
        cookieName: 'My-Xsrf-Cookie',
        headerName: 'My-Xsrf-Header',
      })
    ),

    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },

    importProvidersFrom(
      // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
      // and returns simulated server responses.
      // Remove it when a real server is ready to receive requests.
      /*
      HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, {
          dataEncapsulation: false,
          passThruUnknownUrl: true,
          put204: false // return entity after PUT/update
        }
      )*/
    ),
    provideProtractorTestingSupport(), // essential for e2e testing
  ]
};
