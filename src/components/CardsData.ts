import { ICardsData } from "../types/model/cardsData";
import { IProductCard } from "../types/model/productCard";
import { IEvents } from "./base/events";

export class CardsData implements ICardsData{

    protected _cards: IProductCard[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;}

        set cards(cards: IProductCard[]) {
            this._cards = cards;
            this.events.emit('cards:added');
        }
        get cards(): IProductCard[] {
            return this._cards;
        }

}