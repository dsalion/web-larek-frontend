import { Component } from './base/Component';
import { IEvents } from './base/events';
import { BasketData } from './BasketData';
import { IProductCard } from '../types';

export interface IBasket {
    cards: string
    total: number  
}

export class BasketView extends Component<IBasket> {
	protected _cards: HTMLUListElement;
	protected _button: HTMLButtonElement;
	protected _total: HTMLElement;
	protected events: IEvents;
	protected basketData: BasketData;
	protected _emptyText: HTMLElement;
	protected element: HTMLElement

	constructor(
		template: HTMLTemplateElement,
		events: IEvents,
		basketData: BasketData
	) {
		super(template);
		this.events = events;
		this.basketData = basketData;
		this.element = template;

		this._cards = template.querySelector('.basket__list');
		this._button = template.querySelector('.basket__button');
		this._total = template.querySelector('.basket__price');
		this._emptyText = template.querySelector('.basket__empty') as HTMLElement;
		this._button.addEventListener('click', () => {
			this.events.emit('basket:addedToOrder', basketData.products);
		});
		this.updateList();
		events.on('basket:added', () => {
			this.updateList();
		});
		events.on('basket:delItem', () => {
			this.updateList();
		});
	}

	private createCardHTML(product: IProductCard): string {
		return `
            <li class="basket__item card card_compact">
                <span class="basket__item-index">${
									this.basketData.products.indexOf(product) + 1
								}</span>
                <span class="card__title">${product.title}</span>
                <span class="card__price">${product.price} синапсов</span>
                <button class="basket__item-delete" aria-label="удалить"></button>
            </li>
        `;
	}

	updateList() {
		this._cards.innerHTML = '';
		if (this.basketData.products.length) {
			this.basketData.products.forEach((product) => {
				this._cards.innerHTML += this.createCardHTML(product);
				this.setText(this._button, 'Оформить') 
				this.setDisabled(this._button, false);
			});
			this._emptyText.style.display = 'none';
		} else {
			this.setText(this._emptyText,'Корзина пуста' ) 
			this._emptyText.style.display = 'block';
			this.setText(this._button, 'Добавьте товары в корзину') 
			this.setDisabled(this._button, true);
		}
		this.setText(this._total, `${this.basketData.getSum()} синапсов` ) 

		const deleteButtons = this._cards.querySelectorAll('.basket__item-delete');
		deleteButtons.forEach((button, index) => {
			button.addEventListener('click', () => {
				this.basketData.delFromBasket(this.basketData.products[index].id);
			});
		});
	}

	set total(value: string) {
		this.setText(this._total, value) 
	}

	set cards(value: HTMLUListElement) {
		this._cards.replaceChildren(value);
		if (this._cards.children.length > 0) {
			this._emptyText.style.display = 'none';
		} else {
			this.updateList();
		}
	}
}

