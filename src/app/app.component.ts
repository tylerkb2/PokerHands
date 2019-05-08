import { Component, OnInit } from '@angular/core';
import { HandEvaluationService } from './services/hand-evaluation.service';
import { Card, CardType, CardValue } from './models/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly MAX_HAND_SIZE: number = 5;

  readonly cardsValues: CardValue[] = [
    CardValue.Two,
    CardValue.Three,
    CardValue.Four,
    CardValue.Five,
    CardValue.Six,
    CardValue.Seven,
    CardValue.Eight,
    CardValue.Nine,
    CardValue.Ten,
    CardValue.Jack,
    CardValue.Queen,
    CardValue.King,
    CardValue.Ace
  ];

  readonly cardTypes: CardType[] = [
    CardType.Clubs,
    CardType.Diamonds,
    CardType.Hearts,
    CardType.Spades
  ];

  CardType = CardType;
  CardValue = CardValue;
  dummyHandOne: Card[];
  dummyHandTwo: Card[];
  winMessage = '';

  constructor(private handEvaluationService: HandEvaluationService) {
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.dummyHandOne = this.generateRandomHand();
    this.dummyHandTwo = this.generateRandomHand();
    const winningHand = this.handEvaluationService.determineWinningHand(this.dummyHandOne, this.dummyHandTwo);
    this.winMessage = winningHand === this.dummyHandOne
      ? 'Dummy Hand One Wins!'
      : 'Dummy Hand Two Wins!';
  }

  private generateRandomHand(): Card[] {
    return Array.from(Array(this.MAX_HAND_SIZE).keys())
      .map(() => {
        return this.getRandomCard();
      });
  }


  private getRandomCard(): Card {
    return {
      type: this.getRandomCardType(),
      value: this.getRandomCardValue()
    };
  }

  private getRandomCardType(): CardType {
    return this.cardTypes[this.getRandomInt(0, this.cardTypes.length)];
  }

  private getRandomCardValue(): CardValue {
    return this.cardsValues[this.getRandomInt(0, this.cardsValues.length)];
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
