import { Component } from "./base/Component";
import { IBasketView } from "../types";
import { IEvents } from "./base/events";

export class BasketView extends Component<IBasketView> {

    
    protected _cards: HTMLUListElement
    protected _indexItem: HTMLSpanElement
    protected _button: HTMLButtonElement
    protected _total: HTMLElement
    protected events: IEvents

    constructor(template: HTMLElement, events: IEvents ) {
        super(template)
        this.events = events
       
        this._cards = template.querySelector('.basket__list')
        this._button = template.querySelector('.basket__button')
        this._total = template.querySelector('.basket__price')

    }

    set total(value: string) {
        this._total.textContent = value
    } 

}