import {Component} from '@angular/core';
import {GameEngineService} from '../../game-engine.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public gameEngine: GameEngineService) {}

}
