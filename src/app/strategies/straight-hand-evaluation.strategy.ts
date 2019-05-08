import { Card } from '../models/card';
import { HandType } from '../models/hand-type';
import { Injectable } from '@angular/core';

@Injectable()
export class StraightHandEvaluationStrategy{

    evaluate(cards: Card[]): HandType {
        const isStraight = cards.every((card, i) => i !== 0 ? card.value === cards[i - 1].value + 1 : true);

        return isStraight ? HandType.Straight : HandType.None;
    }
}