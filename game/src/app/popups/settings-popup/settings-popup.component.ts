import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GameEngineService} from '../../game-engine.service';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class SettingsPopupComponent {
  public gameSpeed: number;
  public boardSize: number;
  constructor(
    public dialogRef: MatDialogRef<SettingsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gameEngine: GameEngineService
  ) {
    this.gameSpeed = this.gameEngine.gameSpeed;
    this.boardSize = this.gameEngine.boardSize;
  }

  save(): void {
    if (typeof this.gameSpeed === 'string') {
      this.gameSpeed = parseInt(this.gameSpeed);
    }
    if (typeof this.boardSize === 'string') {
      this.boardSize = parseInt(this.boardSize);
    }
    this.dialogRef.close({gameSpeed: this.gameSpeed, boardSize: this.boardSize});
  }

}
