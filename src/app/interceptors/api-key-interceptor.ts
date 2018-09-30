import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';

// Configs
import { environment } from '../../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  private token = environment.apiKey;
  private API_URL = 'https://api.worldoftanks.ru/wot';

  constructor(
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    if (request.url.includes('assets')) {
      return next.handle(request);
    }

    const requestUrl = {
      url: `${this.API_URL}/${request.url}`,
      params: request.params.set('application_id', this.token),
    };

    const userRequest = request.clone(requestUrl);

    return next.handle(userRequest).catch(error => this.handleAuthError(error));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    console.warn(error);
    return throwError(error);
  }
}
