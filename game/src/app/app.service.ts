import { Injectable } from '@angular/core';

export interface SquareItem {
  name: string;
  id: string;
  checked: boolean;
  whoWon: string;
  pending: boolean;
  disabled: boolean;
}
export enum whoWon {
  computer = 'computer',
  user = 'user'
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {}
  public generateData(): SquareItem[] {
    const objectsArray = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 100; i++) {
      let uniqueId = '';
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters.charAt(randomIndex);
      }
      objectsArray.push({
        name: `square${i + 1}`,
        id: uniqueId,
        checked: false,
        whoWon: '',
        pending: false,
        disabled: true
      });
    }

    return objectsArray;
  }
  public _defineWinner(square: SquareItem, winner: whoWon) {
    square.checked = true;
    square.pending = false;
    square.disabled = true;
    square.whoWon = winner;
  }
}
