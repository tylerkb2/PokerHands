import { Card } from '../models/card';
import { HandType } from '../models/hand-type';

export interface IHandEvaluationStrategy {
    evaluate(cards: Card[]): HandType;
}
