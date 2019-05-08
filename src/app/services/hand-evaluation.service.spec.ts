import { TestBed, async } from '@angular/core/testing';
import { HandEvaluationService } from './hand-evaluation.service';
import { StraightHandEvaluationStrategy } from '../strategies/straight-hand-evaluation.strategy';
import { Card, CardType, CardValue } from '../models/card';
import { HandType } from '../models/hand-type';
import { IHandEvaluationStrategy } from '../strategies/ihand-evaluation.strategy';
import { StraightFlushHandEvaluationStrategy } from '../strategies/straight-flush-hand-evaluation.strategy';
import { FlushHandEvaluationStrategy } from '../strategies/flush-hand-evaluation.strategy';
import { XPairHandEvaluationStrategy } from '../strategies/x-pair-hand-evaluation.strategy';

describe('AppComponent', () => {
    let sut: HandEvaluationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                HandEvaluationService,
                { provide: 'IHandEvaluationStrategy', useClass: StraightHandEvaluationStrategy, multi: true },
                { provide: 'IHandEvaluationStrategy', useClass: StraightFlushHandEvaluationStrategy, multi: true },
                { provide: 'IHandEvaluationStrategy', useClass: FlushHandEvaluationStrategy, multi: true },
                { provide: 'IHandEvaluationStrategy', useClass: XPairHandEvaluationStrategy, multi: true }
            ]
        }).compileComponents();

        sut = TestBed.get(HandEvaluationService);
    }));

    it('should evaluate to be a straight flush', () => {
        // Arrange
        const hand: Card[] = [
            { type: CardType.Diamonds, value: CardValue.Ten },
            { type: CardType.Diamonds, value: CardValue.Jack },
            { type: CardType.Diamonds, value: CardValue.Queen },
            { type: CardType.Diamonds, value: CardValue.King },
            { type: CardType.Diamonds, value: CardValue.Ace },
        ];

        // Act
        const result = sut.evaluate(hand);

        // Assert
        expect(result.handType).toBe(HandType.StraightFlush);
        expect(result.score).toBe(10000031744);
    });

    it('should evaluate to be a four of a kind', () => {
        // Arrange
        const hand: Card[] = [
            { type: CardType.Diamonds, value: CardValue.Two },
            { type: CardType.Clubs, value: CardValue.Two },
            { type: CardType.Spades, value: CardValue.Two },
            { type: CardType.Hearts, value: CardValue.Two },
            { type: CardType.Clubs, value: CardValue.Ace },
        ];

        // Act
        const result = sut.evaluate(hand);

        // Assert
        expect(result.handType).toBe(HandType.FourKind);
        expect(result.score).toBe(3486800801);
    });

    it('should evaluate to be a flush', () => {
        // Arrange
        const hand: Card[] = [
            { type: CardType.Clubs, value: CardValue.Two },
            { type: CardType.Clubs, value: CardValue.Nine },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Jack },
            { type: CardType.Clubs, value: CardValue.Ace },
        ];

        // Act
        const result = sut.evaluate(hand);

        // Assert
        expect(result.handType).toBe(HandType.Flush);
        expect(result.score).toBe(282495221);
    });

    it('should evaluate to be a straight', () => {
        // Arrange
        const hand: Card[] = [
            { type: CardType.Clubs, value: CardValue.Eight },
            { type: CardType.Diamonds, value: CardValue.Nine },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Hearts, value: CardValue.Jack },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.evaluate(hand);

        // Assert
        expect(result.handType).toBe(HandType.Straight);
        expect(result.score).toBe(60474112);
    });

    it('should evaluate to be a three of a kind', () => {
        // Arrange
        const hand: Card[] = [
            { type: CardType.Clubs, value: CardValue.Eight },
            { type: CardType.Diamonds, value: CardValue.Eight },
            { type: CardType.Clubs, value: CardValue.Eight },
            { type: CardType.Hearts, value: CardValue.Jack },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.evaluate(hand);

        // Assert
        expect(result.handType).toBe(HandType.ThreeKind);
        expect(result.score).toBe(9772537);
    });

    it('should evaluate to be a two pair', () => {
        // Arrange
        const hand: Card[] = [
            { type: CardType.Clubs, value: CardValue.Eight },
            { type: CardType.Diamonds, value: CardValue.Eight },
            { type: CardType.Clubs, value: CardValue.Ace },
            { type: CardType.Hearts, value: CardValue.Ace },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.evaluate(hand);

        // Assert
        expect(result.handType).toBe(HandType.TwoPair);
        expect(result.score).toBe(1085952);
    });

    it('should evaluate to be a one pair', () => {
        // Arrange
        const hand: Card[] = [
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Diamonds, value: CardValue.Eight },
            { type: CardType.Clubs, value: CardValue.Five },
            { type: CardType.Hearts, value: CardValue.Queen },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.evaluate(hand);

        // Assert
        expect(result.handType).toBe(HandType.OnePair);
        expect(result.score).toBe(68553);
    });

    it('should break a tie of two straights', () => {
        // Arrange
        const straight1: Card[] = [
            { type: CardType.Clubs, value: CardValue.Nine },
            { type: CardType.Diamonds, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Jack },
            { type: CardType.Hearts, value: CardValue.Queen },
            { type: CardType.Clubs, value: CardValue.King },
        ];

        const straight2: Card[] = [
            { type: CardType.Clubs, value: CardValue.Eight },
            { type: CardType.Diamonds, value: CardValue.Nine },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Hearts, value: CardValue.Jack },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.determineWinningHand(straight1, straight2);

        // Assert
        expect(result).toBe(straight1);
    });

    it('should break a tie of two flushes', () => {
        // Arrange
        const flush1: Card[] = [
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Jack },
            { type: CardType.Clubs, value: CardValue.Queen },
            { type: CardType.Clubs, value: CardValue.King },
        ];

        const flush2: Card[] = [
            { type: CardType.Clubs, value: CardValue.Nine },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Jack },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.determineWinningHand(flush1, flush2);

        // Assert
        expect(result).toBe(flush1);
    });

    it('should break a tie three kind', () => {
        // Arrange
        const threeKind1: Card[] = [
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Diamonds, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Queen },
            { type: CardType.Clubs, value: CardValue.King },
        ];

        const threeKind2: Card[] = [
            { type: CardType.Clubs, value: CardValue.Two },
            { type: CardType.Clubs, value: CardValue.Two },
            { type: CardType.Diamonds, value: CardValue.Two },
            { type: CardType.Clubs, value: CardValue.Jack },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.determineWinningHand(threeKind1, threeKind2);

        // Assert
        expect(result).toBe(threeKind1);
    });

    it('should break a tie full house', () => {
        // Arrange
        const fullHouse1: Card[] = [
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Diamonds, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Ace },
            { type: CardType.Clubs, value: CardValue.Ace },
        ];

        const fullHouse2: Card[] = [
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Ten },
            { type: CardType.Diamonds, value: CardValue.Ten },
            { type: CardType.Clubs, value: CardValue.Queen },
            { type: CardType.Clubs, value: CardValue.Queen },
        ];

        // Act
        const result = sut.determineWinningHand(fullHouse1, fullHouse2);

        // Assert
        expect(result).toBe(fullHouse1);
    });

    it('should break a tie high card', () => {
        // Arrange
        const highCard1: Card[] = [
            { type: CardType.Clubs, value: CardValue.Two },
            { type: CardType.Clubs, value: CardValue.Three },
            { type: CardType.Diamonds, value: CardValue.Four },
            { type: CardType.Clubs, value: CardValue.Six },
            { type: CardType.Clubs, value: CardValue.Ace },
        ];

        const highCard2: Card[] = [
            { type: CardType.Clubs, value: CardValue.Two },
            { type: CardType.Clubs, value: CardValue.Three },
            { type: CardType.Diamonds, value: CardValue.Four },
            { type: CardType.Clubs, value: CardValue.Six },
            { type: CardType.Clubs, value: CardValue.Seven },
        ];

        // Act
        const result = sut.determineWinningHand(highCard1, highCard2);

        // Assert
        expect(result).toBe(highCard1);
    });
});