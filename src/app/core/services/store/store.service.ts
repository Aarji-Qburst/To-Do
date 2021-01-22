import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  storage: any = {};
  constructor() { }
  addToStorage(key: string, value: any): void {
    this.storage[key] = value;
  }
  getStorageValue(key: string): any {
    return this.storage[key];
  }
  removeFromStorage(key: string): void {
    delete this.storage[key];
  }
  clearStorage(): void {
    this.storage = {};
  }  
}
