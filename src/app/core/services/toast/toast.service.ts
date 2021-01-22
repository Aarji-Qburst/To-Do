import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Toast } from '../../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  show(arg:Toast) {
    const config = new MatSnackBarConfig();
    config.duration = arg.duration ?? 5000;
    config.panelClass = arg.type === 'Error' ? 'toast-error': 'toast-success';
    this.snackBar.open(arg.message, undefined, config);
  }
}
