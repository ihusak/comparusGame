import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class SettingsPopupComponent {
  public gameSpeed: number;
  constructor(
    public dialogRef: MatDialogRef<SettingsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gameSpeed = data.gameSpeed;
  }

  save(): void {
    this.dialogRef.close(this.gameSpeed);
  }

}
