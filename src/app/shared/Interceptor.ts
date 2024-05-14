import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { LoaderService } from './common/loader.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private _loading: LoaderService) { }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
    //         if (event instanceof HttpResponse) {
    //             this.onEnd();
    //         }
    //     },
    //         (err: any) => {
    //             this.onEnd();
    //         }
    //     ))
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //this._loading.setLoading(true, request.url);
        console.log("startI");
        this.showLoader();
        return next.handle(request)
          .pipe(catchError((err) => {
            //this._loading.setLoading(false, request.url);
            console.log("errorI");
            this.hideLoader();
            return err;
          }))
          .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
            if (evt instanceof HttpResponse) {
              //this._loading.setLoading(false, request.url);
              console.log("endI");
              this.hideLoader();
            }
            return evt;
          }));
      }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this._loading.show();
    }

    private hideLoader(): void {
        this._loading.hide();
    }
}