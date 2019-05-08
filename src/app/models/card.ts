export class Card {
    type: CardType;
    value: CardValue;
}

export enum CardType {
    Hearts = 1,
    Diamonds = 2,
    Spades = 3,
    Clubs = 4
}

export enum CardValue {
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13,
    Ace = 14
}