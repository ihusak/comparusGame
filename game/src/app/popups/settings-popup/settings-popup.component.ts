import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppService} from '../../app.service';

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
    private appService: AppService
  ) {
    this.gameSpeed = this.appService.gameSpeed;
    this.boardSize = this.appService.boardSize;
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
