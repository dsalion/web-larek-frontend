import { Component } from "./base/Component";
import { IBasketView } from "../types";
import { IEvents } from "./base/events";
import { createElement } from "../utils/utils";
export class BasketView extends Component<IBasketView> {

    protected _element: HTMLElement
    protected _cards: HTMLUListElement
    protected _indexItem: HTMLSpanElement
    protected _button: HTMLButtonElement
    protected _total: HTMLElement
    protected events: IEvents

    constructor(template: HTMLTemplateElement, events: IEvents ) {
        super(template)
        this.events = events
       this._element = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
        this._cards = this._element.querySelector('.basket__list')
        this._button = this._element.querySelector('.basket__button')
        this._total = this._element.querySelector('.basket__price')
        
        this._button.addEventListener('click', () => {
            this.events.emit('basket:addedToOrder')})
        
            
    }

    set total(value: string) {
        this._total.textContent = value
    } 

    
}