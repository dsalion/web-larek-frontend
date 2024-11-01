import { Component } from './base/Component';
import { IEvents } from './base/events';
import { Card } from './Cardview';
interface CardPreview {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	price: number;
}

export class PreviewCard extends Component<CardPreview> {
	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _description: HTMLElement;
	protected _image: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _price: HTMLElement;
	protected events: IEvents;
	protected _id: string;

	constructor(container: HTMLTemplateElement, events: IEvents) {
		super(container);
		this.events = events;
		this._category = container.querySelector('.card__category');
		this._title = container.querySelector('.card__title');
		this._description = container.querySelector('.card__text');
		this._price = container.querySelector('.card__price');
		this._image = container.querySelector('.card__image');
		this._button = container.querySelector(`.button`);

		this._button.addEventListener('click', () => {
			this.events.emit('product:addedtobasket', this);
		});
	}

	set description(value: string) {
		this.setText(this._description, value) 
	}

	set title(value: string) {
		this.setText(this._title, value) 
	}

	set category(value: string) {
		this.setText(this._category, value) 
		switch (value) {
			case 'софт-скил':
				this._category.classList.remove('card__category_other');
				this._category.classList.add('card__category_soft');
				break;

			case 'дополнительное':
				this._category.classList.remove('card__category_other');
				this._category.classList.add('card__category_additional');
				break;
			case 'кнопка':
				this._category.classList.remove('card__category_other');
				this._category.classList.add('card__category_button');
				break;
			case 'хард-скил':
				this._category.classList.remove('card__category_other');
				this._category.classList.add('card__category_hard');
				break;
		}
	}

	set price(value: string) {
		value !== null
			? (this._button.disabled = false)
			: (this._button.disabled = true);
		this.setText(this._price, value !== null ? `${value} Cинапсов` : 'Бесценно' )
	}

	set image(value: string) {
		this._image.setAttribute('src', value);
	}

	set id(value: string) {
		this._id = value;
	}

	get id() {
		return this._id;
	}
}
