import { Component } from "./base/Component";
import { IBasketView } from "../types";
import { IEvents } from "./base/events";
import { createElement } from "../utils/utils";
import { BasketData } from "./BasketData";
import { IProductCard } from "../types/model/productCard";

export class BasketView extends Component<IBasketView> {

    
    protected _cards: HTMLUListElement
    protected _button: HTMLButtonElement
    protected _total: HTMLElement
    protected events: IEvents
    protected basketData: BasketData
    protected _emptyText: HTMLElement

    constructor(template: HTMLTemplateElement, events: IEvents, basketData: BasketData) {
        super(template)
        this.events = events
        this.basketData = basketData
       
        this._cards = template.querySelector('.basket__list')
        this._button = template.querySelector('.basket__button')
        this._total = template.querySelector('.basket__price')
        this._emptyText = template.querySelector('.basket__empty') as HTMLElement
        this._button.addEventListener('click', () => {
            this.events.emit('basket:addedToOrder')
        })
        this.updateList()
        events.on('basket:added', () => {
            this.updateList()
        })
    }

    private createCardHTML(product: IProductCard): string {
        return `
            <li class="basket__item card card_compact">
                <span class="basket__item-index">${this.basketData.products.indexOf(product) + 1}</span>
                <span class="card__title">${product.title}</span>
                <span class="card__price">${product.price} синапсов</span>
                <button class="basket__item-delete" aria-label="удалить"></button>
            </li>
        `
    }

    private updateList() {
        this._cards.innerHTML = ''
        if (this.basketData.products.length) {
            this.basketData.products.forEach(product => {
                this._cards.innerHTML += this.createCardHTML(product)
            })
            this._emptyText.style.display = 'none'
        } else {
            this._emptyText.textContent = 'Корзина пуста'
            this._emptyText.style.display = 'block'
        }
        this._total.textContent = `${this.basketData.getSum()} синапсов`
        console.log('updateList',this._cards)
    }

    set total(value: string) {
        this._total.textContent = value
    } 

    set cards(value: HTMLUListElement) {
        this._cards.replaceChildren(value)
        if (this._cards.children.length > 0) {
            this._emptyText.style.display = 'none'
        } else {
            this.updateList()
        }
    }

   /* render(data: BasketData): HTMLElement {
        Object.assign(this as object, data);
        this.updateList();
        return this.container;
    }*/
}

export class BasketItemView extends Component<IBasketView> {

    protected _element: HTMLElement
    protected events: IEvents

    constructor(template: HTMLTemplateElement, events: IEvents) {
        super(template)
        this.events = events
        this._element = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
    }
} 

/*  export class BasketView extends Component<IBasketView> {

    protected _element: HTMLElement
    protected _cards: HTMLUListElement
    protected _button: HTMLButtonElement
    protected _total: HTMLElement
    protected events: IEvents

    constructor(template: HTMLTemplateElement, events: IEvents ) {
        super(template)
        this.events = events
       
        this._cards = template.querySelector('.basket__list')
        this._button = template.querySelector('.basket__button')
        this._total = template.querySelector('.basket__price')
        
        this._button.addEventListener('click', () => {

            this.events.emit('basket:addedToOrder')})
        
            
        }

        set total(value: string) {
            this._total.textContent = value
        } 
    
        set cards(value: HTMLUListElement) {
            this._cards.replaceChildren(value)
        }
    
        
    }
    
    export class BasketItemView extends Component<IBasketView> {
    
        protected _element: HTMLElement
        protected events: IEvents
    
        constructor(template: HTMLTemplateElement, events: IEvents) {
            super(template)
            this.events = events
            this._element = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
        }
    } 
    
  */    