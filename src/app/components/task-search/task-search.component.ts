import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent implements OnInit {


  searchText: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.searchEvent.emit(this.searchText);
  }

}
