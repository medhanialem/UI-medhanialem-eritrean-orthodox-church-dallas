import { Injectable } from '@angular/core';
import * as alertifyJs from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, onCallback: () => any) {
    alertifyJs.confirm(message, function(e) {
      if (e) {
        onCallback();
      } else {}
    });
  }

  success(message: string) {
    alertifyJs.success(message);
  }

  error(message: string) {
    alertifyJs.error(message);
  }

  warning(message: string) {
    alertifyJs.warning(message);
  }

  message(message: string) {
    alertifyJs.message(message);
  }

}
