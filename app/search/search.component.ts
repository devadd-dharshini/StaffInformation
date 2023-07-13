import { Component } from '@angular/core';
import { SearchingService } from '../searching.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchText:any
  employees: any[] = [];
  

  constructor(private deva: SearchingService ) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employees = this.deva
    .getEmployees();
  }

  searchEmployees() {
    if (!this.searchText) {
      this.getEmployees();
      return;
    }

    this.employees = this.employees.filter(
      employee => employee.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}


