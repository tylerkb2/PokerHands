import { Card } from '../models/card';
import { HandType } from '../models/hand-type';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/internal/operators';

@Injectable()
export class XPairHandEvaluationStrategy {

    evaluate(cards: Card[]): HandType {
        const cardsGroupedByValue = from(cards).pipe(
            groupBy(card => card.value),
            mergeMap(group => group.pipe(toArray()))
        );

        const handTypes: HandType[] = [];

        cardsGroupedByValue.subscribe(group => {
            switch (group.length) {
                case 2: {
                    handTypes.push(handTypes.filter(h => h === HandType.OnePair).length > 0 ? HandType.TwoPair : HandType.OnePair);
                    break;
                }
                case 3: {
                    handTypes.push(HandType.ThreeKind);
                    break;
                }
                case 4: {
                    handTypes.push(HandType.FourKind);
                    break;
                }
            }
        });

        return handTypes.length > 0 ? Math.max.apply(Math, handTypes) : HandType.None;
    }
}