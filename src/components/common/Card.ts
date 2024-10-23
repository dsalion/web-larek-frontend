export class Card {

    protected itemElement: HTMLElement;
    protected element: HTMLElement;
    protected title: HTMLElement;
    protected price: HTMLElement;
    protected category: HTMLElement;
    protected image: HTMLElement;

    constructor (template: HTMLTemplateElement) {
        this.itemElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this.title = this.itemElement.querySelector('.card__title');
        this.price = this.itemElement.querySelector('.card__price');
        this.category = this.itemElement.querySelector('.card__category');
        this.image = this.itemElement.querySelector('.card__image')
}

    render(data: {title: string, price: string, category: string, image: string}) {
        this.title.textContent = data.title;
        this.price.textContent = data.price;
        this.category.textContent = data.category;
        this.image.setAttribute('src', data.image);
        return this.itemElement;
    }
}