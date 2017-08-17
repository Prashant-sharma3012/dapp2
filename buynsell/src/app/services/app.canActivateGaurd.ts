import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DataService } from './app.data.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(private DataService: DataService) {}

  canActivate() {
    return this.DataService.isLoggedIn();
  }
}