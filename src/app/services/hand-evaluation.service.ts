import { IHandEvaluationStrategy } from '../strategies/ihand-evaluation.strategy';
import { Card } from '../models/card';
import { Injectable, Inject } from '@angular/core';
import { HandEvaluationResult } from '../models/hand-evaluation-result';
import { HandType } from '../models/hand-type';

@Injectable()
export class HandEvaluationService {
    readonly HAND_TYPE_FACTOR: number = 10;
    readonly CARD_FACTOR: number = 2;

    constructor(@Inject('IHandEvaluationStrategy') private evaluators: IHandEvaluationStrategy[]) { }

    evaluate(hand: Card[]): HandEvaluationResult {
        const sortedHand = hand.sort((a, b) => a.value > b.value ? 1 : -1);
        const handType = <HandType>Math.max.apply(Math, this.evaluators.map(e => e.evaluate(sortedHand)));
        let score = Math.pow(handType, this.HAND_TYPE_FACTOR);

        hand.forEach(card => {
            score += Math.pow(this.CARD_FACTOR, card.value);
        });

        return {
            handType: handType,
            score: score
        };
    }

    determineWinningHand(hand1: Card[], hand2: Card[]): Card[] {
        return this.evaluate(hand1).score > this.evaluate(hand2).score
            ? hand1
            : hand2;
    }
}