import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchingService {
  private deva: any[] = [
    
  
  ];

  getEmployees(): any[] {
    return this.deva;
  }
}

 