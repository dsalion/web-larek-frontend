import { ICardsData } from '../types';
import { IProductCard } from '../types';
import { IEvents } from './base/events';

export class CardsData implements ICardsData {
	protected _cards: IProductCard[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards: IProductCard[]) {
		this._cards = cards;
		this.events.emit('cards:added');
	}
	get cards(): IProductCard[] {
		return this._cards;
	}
	getCard(item: string): IProductCard {
		return this._cards.find((card) => card.id === item);
	}
}
