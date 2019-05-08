import { Card } from '../models/card';
import { HandType } from '../models/hand-type';
import { Injectable } from '@angular/core';

@Injectable()
export class FlushHandEvaluationStrategy {

    evaluate(cards: Card[]): HandType {
        const isFlush = cards.every((card, i) => {
            return i !== 0
                ? card.type === cards[i - 1].type
                : true;
        });

        return isFlush ? HandType.Flush : HandType.None;
    }
}