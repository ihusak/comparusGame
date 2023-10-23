import {Component, OnInit} from '@angular/core';
import {AppService, SquareItem, whoWon} from './app.service';
import {MatDialog} from '@angular/material/dialog';
import {SettingsPopupComponent} from "./popups/settings-popup/settings-popup.component";
import {EndGamePopupComponent} from "./popups/end-game-popup/end-game-popup.component";
import {InfoGamePopupComponent} from "./popups/info-game-popup/info-game-popup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data: SquareItem[] = [];
  public scoreComputer: number = 0;
  public scoreUser: number = 0;
  public restartGameCond: boolean = false;
  public gameSpeed: number = 800;
  private filteredData: SquareItem[];
  private timeOut: number = null;
  private interval: number = null;
  constructor(public appService: AppService, public dialog: MatDialog) {}
  ngOnInit() {
    this.data = this.appService.generateData();
  }
  public handler(square: SquareItem) {
    if (square.disabled) return;
    this.appService._defineWinner(square, whoWon.user)
    this.scoreUser += 1;
    clearTimeout(this.timeOut);
  }
  public startGame() {
    this.interval = setInterval(() => {
      this.filteredData = this.data.filter(item => item.checked !== true);
      if (this.filteredData.length === 0 || this.scoreComputer === 10 || this.scoreUser === 10) {
        this.endGame();
        return;
      }
      const randomSquare: SquareItem = this.filteredData[Math.floor(Math.random() * this.filteredData.length)];
      randomSquare.pending = true;
      randomSquare.disabled = false;
      this.timeOut = setTimeout(() => {
        this.appService._defineWinner(randomSquare, whoWon.computer);
        this.scoreComputer += 1;
      }, this.gameSpeed);
    }, this.gameSpeed + 10);
  }
  public restartGame() {
    if(this.restartGame) {
      this.data = this.appService.generateData();
      this.restartGameCond = false;
      this.scoreUser = 0;
      this.scoreComputer = 0;
    }
    this.startGame();
  }
  public openSettings() {
    const dialogRef = this.dialog.open(SettingsPopupComponent, {
      width: '350px',
      data: {gameSpeed: this.gameSpeed}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.gameSpeed = parseInt(result);
      }
    });
  }
  private endGame() {
    clearInterval(this.interval);
    const dialogRef = this.dialog.open(EndGamePopupComponent, {
      width: '350px',
      panelClass: 'end-game-popup',
      data: {scoreComputer: this.scoreComputer, scoreUser: this.scoreUser}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.restartGameCond = true;
    });
  }
  public openGameInfo() {
    const dialogRef = this.dialog.open(InfoGamePopupComponent, {
      width: '450px',
    });
  }
}

