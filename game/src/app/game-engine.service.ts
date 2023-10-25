import { Injectable } from '@angular/core';
import {SquareItemFactory} from './base/board-square-factory';
import {EndGamePopupComponent} from './popups/end-game-popup/end-game-popup.component';
import {MatDialog} from '@angular/material/dialog';

export interface SquareItem {
  name: string;
  id: string;
  checked: boolean;
  whoWon: string;
  pending: boolean;
  disabled: boolean;
  color?: string;
}
export enum whoWon {
  computer = 'computer',
  user = 'user'
}
@Injectable({
  providedIn: 'root'
})
export class GameEngineService {
  public data: SquareItem[];
  public scoreComputer: number = 0;
  public scoreUser: number = 0;
  public gameSpeed: number = 800;
  public boardSize: number = 100;
  public restartGameCond: boolean = false;
  private pendingGame: boolean = false;
  private filteredData: SquareItem[];
  private currentSquare: SquareItem;
  private timeOut: number;
  constructor(private squareItemFactory: SquareItemFactory, private dialog: MatDialog) {
    this.data = this.generateData(this.boardSize);
  }
  // Generate random data for game
  public generateData(size: number): SquareItem[] {
    const arr = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < size; i++) {
      let uniqueId = '';
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters.charAt(randomIndex);
      }
      const newSquare = this.squareItemFactory.createSquare({
        name: `square${i + 1}`,
        id: uniqueId,
        checked: false,
        whoWon: '',
        pending: false,
        disabled: true
      });
      arr.push(newSquare);
    }
    return arr;
  }
  public userHandler(square: SquareItem) {
    if (square.disabled) return;
    this._defineWinner(square, whoWon.user);
    this.scoreUser += 1;
    clearTimeout(this.timeOut);
    this.playRound();
  }
  public playRound() {
    this.pendingGame = true;
    this.filteredData = this.data.filter(item => item.checked !== true);
    if (this.filteredData.length === 0 || this.scoreComputer === 10 || this.scoreUser === 10) {
      this.currentSquare.pending = false;
      this.currentSquare.disabled = true;
      this.endGame();
      clearTimeout(this.timeOut);
      return;
    }
    const randomSquare: SquareItem = this.filteredData[Math.floor(Math.random() * this.filteredData.length)];
    randomSquare.pending = true;
    randomSquare.disabled = false;
    this.currentSquare = randomSquare;
    this.timeOut = setTimeout(() => {
      this._defineWinner(randomSquare, whoWon.computer);
      if (this.scoreComputer < 10) {
        this.scoreComputer += 1;
        this.playRound();
      }
    }, this.gameSpeed);
  }
  public restartGame() {
    if (this.restartGameCond) {
      this.data = this.generateData(this.boardSize);
      this.restartGameCond = false;
      this.scoreUser = 0;
      this.scoreComputer = 0;
    }
    this.playRound();
  }
  private endGame() {
    const dialogRef = this.dialog.open(EndGamePopupComponent, {
      width: '350px',
      panelClass: 'end-game-popup',
      data: {scoreComputer: this.scoreComputer, scoreUser: this.scoreUser}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.restartGameCond = true;
    });
  }
  public _defineWinner(square: SquareItem, winner: whoWon) {
    square.checked = true;
    square.pending = false;
    square.disabled = true;
    square.whoWon = winner;
  }
  public rerenderGameField() {
    this.data = this.generateData(this.boardSize);
  }
}
