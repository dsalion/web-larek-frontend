import { Component } from "./base/Component";

export class Page extends Component<HTMLElement> {

    protected headerBasket: HTMLElement
    protected wrapper: HTMLElement
    constructor(template: HTMLElement) {
        super(template)
        this.headerBasket = template.querySelector('.header__basket-counter')
        this.wrapper = template.querySelector('.page__wrapper')
    }

    set locked(value: boolean) {
        this.toggleClass(this.wrapper, 'page__wrapper_locked', value);
}

    set basketCounter(value: string) {
        this.setText(this.headerBasket, value)
}
}