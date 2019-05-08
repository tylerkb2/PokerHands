import { Card } from '../models/card';
import { HandType } from '../models/hand-type';
import { Injectable } from '@angular/core';

@Injectable()
export class StraightFlushHandEvaluationStrategy{

    evaluate(cards: Card[]): HandType {
        const isStraightFlush = cards.every((card, i) => {
            return i !== 0
                ? card.value === cards[i - 1].value + 1
                    && card.type === cards[i - 1].type
                : true;
        });

        return isStraightFlush ? HandType.StraightFlush : HandType.None;
    }
}