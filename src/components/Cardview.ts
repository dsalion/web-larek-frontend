import { IEvents } from '../components/base/events';
import { ICard, IProductCard } from '../types';
import { Component } from './base/Component';

export class Card extends Component<IProductCard> {
	protected itemElement: HTMLElement;
	//protected element: HTMLElement;
	protected title: HTMLElement;
	protected price: HTMLElement;
	protected _category: HTMLElement;
	protected image: HTMLElement;
	protected events: IEvents;
	protected id: string;
	protected _categoryColor = <Record<string, string>>{
		"софт-скил": "soft",
    "другое": "other",
    "дополнительное": "additional",
    "кнопка": "button",
    "хард-скил": "hard"
	}

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template);
		this.itemElement = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this.title = this.itemElement.querySelector('.card__title');
		this.price = this.itemElement.querySelector('.card__price');
		this._category = this.itemElement.querySelector('.card__category');
		this.image = this.itemElement.querySelector('.card__image');
		this.events = events;
		this.itemElement.addEventListener('click', () => {
			this.events.emit('cards:chosen', this);
		});
	}

	set category(value: string) {
		this.setText(this._category, value)
		this.toggleClass(this._category, `card__category_${this._categoryColor[value]}`, true);
	}

	render(data: ICard) {
		this.setText(this.title,  data.title)
		this.setText(this.price, data.price !== null ? `${data.price} Cинапсов` : 'Бесценно')
		this.setText(this._category,  data.category)
		this.image.setAttribute('src', data.image);
		this.id = data.id;
		this.category = data.category;
		
		return this.itemElement;
	}

	
}
