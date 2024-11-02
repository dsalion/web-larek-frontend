import { IEvents } from '../components/base/events';
import { IProductCard } from '../types';
import { Component } from './base/Component';

export class Card extends Component<IProductCard> {
	protected itemElement: HTMLElement;
	//protected element: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _category: HTMLElement;
	protected _image: HTMLElement;
	protected events: IEvents;
	protected _id: string;
	protected _description?: HTMLElement;
	protected _categoryColor = <Record<string, string>>{
		"софт-скил": "soft",
    "другое": "other",
    "дополнительное": "additional",
    "кнопка": "button",
    "хард-скил": "hard"
	}
	protected _button?: HTMLButtonElement;
	

	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template);
	
		this.itemElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
		this._button = this.itemElement.querySelector('.card__button');	
		this._title = this.itemElement.querySelector('.card__title');
		this._price = this.itemElement.querySelector('.card__price');
		this._category = this.itemElement.querySelector('.card__category');
		this._image = this.itemElement.querySelector('.card__image');
		;
		this.events = events;
		this.itemElement.addEventListener('click', this.handleCardClick);
			
		
		;
		
			
		
	}

	set category(value: string) {
		this.setText(this._category, value)
		this.toggleClass(this._category, `card__category_${this._categoryColor[value]}`, true);
		if (this._categoryColor[value] !== 'other') {
		this.toggleClass(this._category, `card__category_other`, false);
	} }

	set id(value: string) {
		this._id = value;
	}

	get id() {
		return this._id;
	}

	set image(value: string) {
		this._image.setAttribute('src', value);
	}

	set title(value: string) {
		this.setText(this._title, value) 
	}
	
	set price(value: number) {
		this.setText(this._price, value)
	}

	render(data: IProductCard) {
		this.setText(this._title,  data.title)
		this.setText(this._price, data.price !== null ? `${data.price} Cинапсов` : 'Бесценно')
		this.setText(this._category,  data.category)
		this._image.setAttribute('src', data.image);
		this.id = data.id;
		this.category = data.category;
		if (data.description) {
			this.setText(this._description, data.description) 
		}
		
		return this.itemElement;
	}

	handleCardClick = () => {
		this.events.emit('cards:chosen', this);
	};
}
