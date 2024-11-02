import { IProductCard } from '../types';
import { IEvents } from './base/events';
import { Card } from './Cardview';


export class PreviewCard extends Card {
	protected _description: HTMLElement;

	protected template: HTMLTemplateElement;

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template, events);
		this.template = template;

		this.itemElement.removeEventListener('click', this.handleCardClick);
		this._button.addEventListener('click', () => {
			this.events.emit('product:addedtobasket', this);
		});
		if (this._price === null) {
			this._button.disabled = true;
		} else {
			this._button.disabled = false;
		}
	}

	set price(value: number) {
		value !== null
			? (this._button.disabled = false)
			: (this._button.disabled = true);
		this.setText(
			this._price,
			value !== null ? `${value} Cинапсов` : 'Бесценно'
		);
	}
	render(data: IProductCard) {
		super.render(data);
		this.price = data.price;
		return this.itemElement;
	}
}
