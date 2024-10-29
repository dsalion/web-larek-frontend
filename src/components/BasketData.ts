import { IProductCard } from "../types/model/productCard";
import { IEvents } from "./base/events";
import { BasketView } from "./BasketView";

interface IBasketData {
    products: IProductCard[]
    addToBasket(item: IProductCard): void
    delFromBasket(id: string): void
    getSum(): number
    clear(): void
}

export class BasketData implements IBasketData {
    protected _products: IProductCard[]
    protected events: IEvents

    constructor(events: IEvents) {
        this._products = []
        this.events = events
    }

    get products() {
        return this._products
    }

    addToBasket(item: IProductCard): void {
        if (this._products.find(product => product.id === item.id)) {
            this.events.emit('basket:alredyInBasket')
            console.log('uzhe v korzine')
        } else {
            this._products.push(item)
            this.events.emit('basket:added', {id: item.id})
        }
        
    }

    delFromBasket(id: string): void {
        this._products = this._products.filter(item => item.id !== id)
        this.events.emit('basket:delItem')
    }

    getSum(): number {
        if (!this._products.length) return 0;
        return this._products.map((item) => item.price).reduce((a,b) => a + b)
    }

    convertToArrayId(value: IProductCard[]): string[] {
        return value.map((item) => item.id)
    }
    clear(): void {
        this._products = []
    }
}  
