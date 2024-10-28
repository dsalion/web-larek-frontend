import { IEvents } from '../components/base/events';
import { IProductCard, ICard } from '../types/model/productCard';
import { Component } from './base/Component';

export class Card extends Component<IProductCard> {
	protected itemElement: HTMLElement;
	protected element: HTMLElement;
	protected title: HTMLElement;
	protected price: HTMLElement;
	protected category: HTMLElement;
	protected image: HTMLElement;
	protected events: IEvents;
	protected id: string;

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template);
		this.itemElement = template.content
			.querySelector('.card')
			.cloneNode(true) as HTMLElement;
		this.title = this.itemElement.querySelector('.card__title');
		this.price = this.itemElement.querySelector('.card__price');
		this.category = this.itemElement.querySelector('.card__category');
		this.image = this.itemElement.querySelector('.card__image');
		this.events = events;
		this.itemElement.addEventListener('click', () => {
			this.events.emit('cards:chosen',  this );
		});
	}

	render(data: ICard) {
		this.title.textContent = data.title;
		this.price.textContent =
			data.price !== null ? `${data.price} Cинапсов` : 'Бесценно';
		this.category.textContent = data.category;
		this.image.setAttribute('src', data.image);
		this.id = data.id;
		this.setButtonsColor();
		return this.itemElement;
	}

	setButtonsColor() {
		const categoryText = this.category.textContent;
		switch (categoryText) {
			case 'софт-скил':
				this.category.classList.add('card__category_soft');
				break;
			case 'другое':
				this.category.classList.remove('card__category_soft');
				this.category.classList.add('card__category_other');
				break;
			case 'дополнительное':
				this.category.classList.remove('card__category_soft');
				this.category.classList.add('card__category_additional');
				break;
			case 'кнопка':
				this.category.classList.remove('card__category_soft');
				this.category.classList.add('card__category_button');
				break;
			case 'хард-скил':
				this.category.classList.remove('card__category_soft');
				this.category.classList.add('card__category_hard');
				break;
		}
	}
}
