import {Component} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  constructor(public appService: AppService) {}
}
