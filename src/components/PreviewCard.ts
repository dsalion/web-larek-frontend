import { IProductCard } from "../types/model/productCard"
import { Component } from "./base/Component"
import { IEvents } from "./base/events"
import { ICard } from "../types/model/productCard"
interface CardPreview {
    id: string
    title: string
    description: string
    category: string
    image: string
    price: number
}


export class PreviewCard extends Component<CardPreview>{
    protected _category: HTMLElement
    protected _title: HTMLElement
    protected _description: HTMLElement
    protected _image: HTMLElement
    protected _button: HTMLButtonElement
    protected _price: HTMLElement
    protected events: IEvents
    protected itemElement: HTMLElement;
    
   

    constructor(container: HTMLElement, events: IEvents) {
        super(container)
        this.events = events
        this._category = container.querySelector('.card__category')
        this._title = container.querySelector('.card__title')
        this._description = container.querySelector('.card__text')
        this._price = container.querySelector('.card__price')
        this._image = container.querySelector('.card__image')
        this._button = container.querySelector(`.card__button`);
    }
    
    set description(value: string) {
        this._description.textContent = value
      }
    
    set title(value: string) {
        this._title.textContent = value
    } 

    set category(value: string) {
        this._category.textContent = value
    }

    set price(value: string) {
        this._price.textContent = value
    }

    set image(value: string) {
        this._image.setAttribute('src', value);
    }
}