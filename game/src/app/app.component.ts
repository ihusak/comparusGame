import {Component, Inject, OnInit} from '@angular/core';
import {AppService, SquareItem} from './app.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

enum whoWon {
  computer = 'computer',
  user = 'user'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'game';
  data: SquareItem[] = [];
  filteredData: SquareItem[];
  timeOut: number = null;
  public scoreComputer: number = 0;
  public scoreUser: number = 0;
  constructor(public appService: AppService, public dialog: MatDialog) {}
  public handler(item: SquareItem) {
    console.log(item);
    if (item.disabled) return;
    item.checked = true;
    item.whoWon = whoWon.user;
    item.pending = false;
    item.disabled = true;
    this.scoreUser += 1;
    clearTimeout(this.timeOut);
  }
  public startGame() {
    const data = this.data;
    const interval = setInterval(() => {
      this.filteredData = data.filter(item => item.checked !== true);
      if (this.filteredData.length === 0) {
        clearInterval(interval);
        this.endGame();
        return;
      }
      const randomItem = this.filteredData[Math.floor(Math.random() * this.filteredData.length)];
      randomItem.pending = true;
      randomItem.disabled = false;
      this.timeOut = setTimeout(() => {
        randomItem.pending = false;
        randomItem.disabled = true;
        randomItem.whoWon = whoWon.computer;
        randomItem.checked = true;
        this.scoreComputer += 1;
      }, 800);
    }, 850);
  }
  public openSettings() {
    const dialogRef = this.dialog.open(SettingsPopup, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  private endGame() {
    const dialogRef = this.dialog.open(EndGamePopup, {
      width: '250px',
      data: {scoreComputer: this.scoreComputer, scoreUser: this.scoreUser}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    this.data = this.appService.generateData();
  }
}

@Component({
  selector: 'app-settings-popup',
  templateUrl: './popups/settings-popup.html',
})
export class SettingsPopup {

  constructor(
    public dialogRef: MatDialogRef<SettingsPopup>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-settings-popup',
  templateUrl: './popups/settings-popup.html',
})
export class EndGamePopup {

  constructor(
    public dialogRef: MatDialogRef<EndGamePopup>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

