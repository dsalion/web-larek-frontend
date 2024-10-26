import { IEvents } from '../components/base/events';
import { IProductCard, ICard } from '../types/model/productCard';
export class Card {

    protected itemElement: HTMLElement;
    protected element: HTMLElement;
    protected title: HTMLElement;
    protected price: HTMLElement;
    protected category: HTMLElement;
    protected image: HTMLElement;
    protected events: IEvents

    constructor (template: HTMLTemplateElement, events: IEvents) {
        this.itemElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.title = this.itemElement.querySelector('.card__title');
        this.price = this.itemElement.querySelector('.card__price');
        this.category = this.itemElement.querySelector('.card__category');
        this.image = this.itemElement.querySelector('.card__image')
        this.events = events;
        this.itemElement.addEventListener('click', () => {
            this.events.emit('cards:chosen', { card: this })
        })

}

    render(data: ICard) {
        this.title.textContent = data.title;
        this.price.textContent = data.price;
        this.category.textContent = data.category;
        this.image.setAttribute('src', data.image);
        
        return this.itemElement;
    }
}