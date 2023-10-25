import {Component} from '@angular/core';
import {InfoGamePopupComponent} from '../popups/info-game-popup/info-game-popup.component';
import {SettingsPopupComponent} from '../popups/settings-popup/settings-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {AppService} from '../app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(public appService: AppService, private dialog: MatDialog) { }
  public openSettings() {
    const dialogRef = this.dialog.open(SettingsPopupComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.appService.gameSpeed = data.gameSpeed;
      this.appService.boardSize = data.boardSize;
      this.appService.rerenderGameField();
    });
  }
  public openGameInfo() {
    const dialogRef = this.dialog.open(InfoGamePopupComponent, {
      width: '450px',
    });
  }
}
