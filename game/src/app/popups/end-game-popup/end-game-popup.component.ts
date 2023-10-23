import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-end-game-popup',
  templateUrl: './end-game-popup.component.html',
  styleUrls: ['../popup.scss']
})
export class EndGamePopupComponent {
  public scoreTitle = '';
  constructor(
    public dialogRef: MatDialogRef<EndGamePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(this.data.scoreComputer > this.data.scoreUser) {
      this.scoreTitle = 'Computer Win'
    } else {
      this.scoreTitle = 'You Win';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
