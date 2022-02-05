import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor( public loadingService: LoadingService) { }

  ngOnInit(): void {

    this.loadingService.isLoading$.subscribe();
  }

}
