import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Page extends Component<HTMLElement> {

    protected headerBasket: HTMLElement
    protected basketIcon: HTMLElement
    protected wrapper: HTMLElement
    protected events: IEvents
    constructor(template: HTMLElement, events: IEvents) {
        super(template)
        this.events = events
        this.headerBasket = template.querySelector('.header__basket-counter')
        this.wrapper = template.querySelector('.page__wrapper')
        this.basketIcon = template.querySelector('.header__basket')
        this.basketIcon.addEventListener('click', () => {
            this.events.emit('basket:open')
        })
    }

    set locked(value: boolean) {
        this.toggleClass(this.wrapper, 'page__wrapper_locked', value);
}

    set basketCounter(value: string) {
        this.setText(this.headerBasket, value)
}
}