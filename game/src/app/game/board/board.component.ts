import {Component} from '@angular/core';
import {GameEngineService} from '../../game-engine.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  constructor(public gameEngine: GameEngineService) {}
}
